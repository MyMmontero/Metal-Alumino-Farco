document.addEventListener('DOMContentLoaded', function() {
    const quoter = {
        width: 1,
        height: 1,
        material: 'estandar',
        type: 'ventana',

        init: function() {
            this.cacheElements();
            this.bindEvents();
            this.calculate();
        },

        cacheElements: function() {
            this.widthInput = document.getElementById('maf-width-input');
            this.heightInput = document.getElementById('maf-height-input');
            this.widthVal = document.getElementById('maf-width-val');
            this.heightVal = document.getElementById('maf-height-val');
            this.areaDisplay = document.getElementById('maf-area-display');
            this.priceDisplay = document.getElementById('maf-price-display');
            this.typeBtns = document.querySelectorAll('.maf-type-btn');
            this.materialBtns = document.querySelectorAll('.maf-material-btn');
            this.whatsappBtn = document.getElementById('maf-whatsapp-btn');
        },

        bindEvents: function() {
            const self = this;

            if (this.widthInput) {
                this.widthInput.addEventListener('input', function(e) {
                    self.width = parseFloat(e.target.value);
                    self.widthVal.textContent = self.width + 'm';
                    self.calculate();
                });
            }

            if (this.heightInput) {
                this.heightInput.addEventListener('input', function(e) {
                    self.height = parseFloat(e.target.value);
                    self.heightVal.textContent = self.height + 'm';
                    self.calculate();
                });
            }

            this.typeBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    self.typeBtns.forEach(b => b.classList.remove('active'));
                    this.classList.add('active');
                    self.type = this.dataset.type;
                    self.calculate();
                });
            });

            this.materialBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    self.materialBtns.forEach(b => b.classList.remove('active'));
                    this.classList.add('active');
                    self.material = this.dataset.material;
                    self.calculate();
                });
            });

            if (this.whatsappBtn) {
                this.whatsappBtn.addEventListener('click', function() {
                    self.sendWhatsApp();
                });
            }
        },

        calculate: function() {
            const area = this.width * this.height;
            const priceEstandar = parseInt(mafSettings.priceEstandar) || 150000;
            const pricePremium = parseInt(mafSettings.pricePremium) || 250000;
            const base = this.material === 'premium' ? pricePremium : priceEstandar;
            const totalValue = area * base;

            if (this.areaDisplay) {
                this.areaDisplay.textContent = area.toFixed(2) + ' m²';
            }
            if (this.priceDisplay) {
                this.priceDisplay.textContent = new Intl.NumberFormat('es-CO', {
                    style: 'currency',
                    currency: 'COP',
                    minimumFractionDigits: 0
                }).format(totalValue);
            }
        },

        sendWhatsApp: function() {
            const area = (this.width * this.height).toFixed(2);
            const priceEstandar = parseInt(mafSettings.priceEstandar) || 150000;
            const pricePremium = parseInt(mafSettings.pricePremium) || 250000;
            const base = this.material === 'premium' ? pricePremium : priceEstandar;
            const totalValue = area * base;
            const totalFormatted = new Intl.NumberFormat('es-CO', {
                style: 'currency',
                currency: 'COP',
                minimumFractionDigits: 0
            }).format(totalValue);

            const message = `Hola Metal Aluminio Farco! 👋\n\n` +
                `Me gustaría solicitar una cotización formal basada en estos datos:\n\n` +
                `🔹 *Producto:* ${this.type.charAt(0).toUpperCase() + this.type.slice(1)}\n` +
                `🔹 *Calidad:* ${this.material.charAt(0).toUpperCase() + this.material.slice(1)}\n` +
                `🔹 *Medidas:* ${this.width}m (Ancho) x ${this.height}m (Alto)\n` +
                `🔹 *Área:* ${area} m²\n` +
                `💰 *Valor Referencial:* ${totalFormatted}\n\n` +
                `¿Podrían confirmarme disponibilidad y detalles técnicos?`;

            const encodedMessage = encodeURIComponent(message);
            const whatsappNumber = mafSettings.whatsapp || '573000000000';
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
            window.open(whatsappUrl, '_blank');
        }
    };

    if (document.getElementById('maf-quoter-app')) {
        quoter.init();
    }
});
