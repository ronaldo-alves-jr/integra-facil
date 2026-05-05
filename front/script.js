// Dados obtidos do seu script
const propertyData = [
    { alt: "Casa 1", src: "https://imgs.kenlo.io/VWRCUkQ2Tnp3d1BJRDBJVe1szkhnWr9UfpZS9ftWwjXgr7v5Znen3XVcMHllDVRJJeIbi3YwVYEtu0o+9sM-zw4ZvvYQRZmznRa1z7ibzN3Cnkm39IL1j6jA0sn8RZmHzoIi8JfYLkaHioJrF+41AW4gTMQgYAbuTaSKCz1olAuCmEXJVrcZaFtxgiMyvRxh-322ecO02nc7ghGXKuL+jw2wS6TeX111QPlLCdkx8QdQ8Bi1RhJisg0F+onwszjEf6apPt6v33kKGQYx89DwGLD0jIfSctQmG68qazUY414FXaQQ3fjJTuJ8rgIY5OnBCxGAmBnHyvUkZs-tA48Kx7wHkgfKHq0d7U29xYzHhqf4akyHYQds-enKqqblNPagTf-xJWuqgdQv2br3Yux6H7CPQE9oF1UkZWtA3TXdicT5jmWncjSdth5HCl6OzpZqtXZrYEdR-9te52I=.jpg" },
    { alt: "Casa 2", src: "https://imgs.kenlo.io/VWRCUkQ2Tnp3d1BJRDBJVe1szkhnWr9UfpZS9ftWwjXgr7v5Znen3XVcMHllDVRJJeIbi3YwVYEtu0o+9sM-zw4ZvvYQRZmznRa1z7ibzN3Cnkm39IL1j6jA0sn8RZmHzoIi8JfYLkaHioJrF+41AW4gTMQgYAbuTaSKCz1olAuCmEXJVrcZaFtxgiMyvRxh-322ecO02nc7ghGXKuL+jw2wS6TeX111QPlLCdkx8QdQ8Bi1RhJisg0F+onwszjEf6apPt6v33kKGQYx89DwGLD0jIfSctQmG68qazUY414FXaQQ3fjJTuJ8rgIY5OnBCxGAmBnHyvUkZs-tA48Kx7wHkgfKHq0d7U29xYzHhqf4akyHYQds-enKqqblNPagTf-xJWuqgdQv2br3Yux6H7CPQE9oF1UkZWtA3TXdicT5jmWncjSdth5HCl6OzpZqtXZrYEdR-9te52I=.jpg" },
];

const propertyGrid = document.getElementById('property-grid');

propertyData.forEach(property => {
    const propertyDiv = document.createElement('div');
    propertyDiv.classList.add('property');

    const img = document.createElement('img');
    img.src = property.src;
    img.alt = property.alt;

    const title = document.createElement('h2');
    title.textContent = property.alt;

    const link = document.createElement('a');
    link.href = property.src;
    link.textContent = 'Ver Imagem';

    propertyDiv.appendChild(img);
    propertyDiv.appendChild(title);
    propertyDiv.appendChild(link);

    propertyGrid.appendChild(propertyDiv);
});
