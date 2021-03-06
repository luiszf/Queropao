export default function tooltip() {
    const tooltips = document.querySelectorAll('[data-tooltip]');

    tooltips.forEach(item => {
        item.addEventListener('mouseover', onMouseOver)
    })

    function onMouseOver() {
        const tooltipBox = criarTooltipoBox(this)

        onMouseMove.tooltipBox = tooltipBox;
        this.addEventListener('mousemove', onMouseMove)

        onMouseLeave.tooltipBox = tooltipBox;
        onMouseLeave.element = this;
        this.addEventListener('mouseleave', onMouseLeave)
    }

    const onMouseLeave = {
        tooltipBox: '',
        handleEvent() {
            this.tooltipBox.remove();
            this.element.removeListener('mouseleave', onMouseLeave);
            this.element.removeListener('mousemove', onMouseMove)
        }
    }

    const onMouseMove = {
        handleEvent(e){
            this.tooltipBox.style.top = e.pageY + 20 + 'px';
            this.tooltipBox.style.left = e.pageX + 20 + 'px';
        }
    }

    function criarTooltipoBox(element) {
        const tooltipBox = document.createElement('div');
        const text = element.getAttribute('aria-label');
        tooltipBox.classList.add('tooltip');
        tooltipBox.innerText = text;
        document.body.appendChild(tooltipBox);
        return tooltipBox;
    }

}

tooltip();