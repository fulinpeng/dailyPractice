class MyComponent extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        const wrapper = document.createElement('div');
        const style = document.createElement('style');

        style.textContent = `
            .container {
                background-color: lightblue;
                padding: 20px;
            }
        `;

        wrapper.innerHTML = `<h1 class="container">Shadow DOM Example</h1>`;
        shadow.appendChild(style);
        shadow.appendChild(wrapper);
    }
}

customElements.define('my-component', MyComponent);