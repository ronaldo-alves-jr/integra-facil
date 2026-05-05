from selenium import webdriver
from selenium.webdriver.common.by import By
from bs4 import BeautifulSoup
import time
import sqlite3

options = webdriver.ChromeOptions()
options.add_argument('--ignore-certificate-errors')
driver = webdriver.Chrome(options=options)
driver.maximize_window()

urls = [
    "https://www.fazziimoveis.com.br/imoveis/para-alugar/apartamento+casa",
    "https://www.moderniza.imb.br/imoveis/para-alugar/apartamento+casa"
]

conn = sqlite3.connect('imagens_links.db')
cursor = conn.cursor()

cursor.execute('''
    CREATE TABLE IF NOT EXISTS imagens (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        alt TEXT,
        link TEXT,
        preco TEXT
    )
''')
conn.commit()

def extract_and_store_images(html_content):
    soup = BeautifulSoup(html_content, "html.parser")
    card_tags = soup.find_all("a", class_="card-with-buttons borderHover")

    if card_tags:
        cursor.execute('SELECT link FROM imagens')
        existing_links = {row[0] for row in cursor.fetchall()}

        novas_imagens = []

        for card_tag in card_tags:
            image_tag = card_tag.find("img", class_="cards_digital_carousel-image")
            preco_tags = card_tag.find_all("p", class_="card-with-buttons__value")

            if image_tag:
                src = image_tag.get("src")
                if src not in existing_links:
                    alt = image_tag.get("alt")

                    if alt and ',' in alt:
                        alt = alt.split(',')[0].strip()

                    preco = None
                    for p in preco_tags:
                        texto = p.get_text(strip=True)
                        if "/mês" in texto or "Locação" in texto or "Aluguel" in texto:
                            preco = texto
                            break
                  
                    if not preco:
                        preco = "Preço de locação não informado"

                    print(f"Imagem: {alt}")
                    print(f"Link: {src}")
                    print(f"Preço: {preco}")
                    print("-" * 50)

                    novas_imagens.append((alt, src, preco))
                    existing_links.add(src)
                else:
                    print("Imagem duplicada encontrada, ignorando...\n")

        if novas_imagens:
            cursor.executemany('''
                INSERT INTO imagens (alt, link, preco) VALUES (?, ?, ?)
            ''', novas_imagens)
            conn.commit()
            print(f"{len(novas_imagens)} novas imagens inseridas.\n")
        else:
            print("Nenhuma nova imagem nova encontrada.\n")

try:
    for url in urls:

        driver.get(url)
        time.sleep(5)

        while True:
            try:
                driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
                time.sleep(2)

                ver_mais_button = driver.find_element(
                    By.XPATH,
                    "//button[contains(@class, 'btn btn-md btn-primary btn-next')]"
                )
                ver_mais_button.click()
                time.sleep(5)

            except Exception:
                print("Botão 'Ver mais' não encontrado ou não clicável. Navegação concluída.")
                break

        html_content = driver.page_source
        extract_and_store_images(html_content)

except Exception as e:
    print(f"Ocorreu um erro: {e}")

finally:
    driver.quit()
    conn.close()
