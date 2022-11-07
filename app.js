Vue.createApp({
    data() {
        return {
            stickies: []        
        }
    },
    mounted() {
        // localStorage.clear();
        if ('stickies' in localStorage) {
            this.stickies = JSON.parse(localStorage.getItem('stickies'));
        }

        window.addEventListener('keyup', () => {
            let data = JSON.stringify(this.stickies);
            localStorage.setItem('stickies', data);
        });
    },
    methods: {
        addStickie() {
            this.stickies.push({ text: '', color:'#fcfa5d'});
        },
        deleteStickie(index) {
            if (this.stickies[index].text == '') {
                this.stickies.splice(index, 1);
            }
        },
        changeColor(index) {
            const colors = ['#6eed2a', '#f989d6', '#20dff8', '#fcfa5d'];
            const currentColor = this.stickies[index].color;
            const indx = colors.indexOf(currentColor);
            const newColorIndx = (indx + 1) % colors.length;
            this.stickies[index].color = colors[newColorIndx];
        }
    }
}).mount('#app')