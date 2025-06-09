Vue.createApp({
    data() {
        return {
            stickies: [],           // Your app's variables go here
            draggedIndex: null,
            storageKey: 'sticky-notes-app'
        }
    },
    mounted() {
        this.loadFromStorage();  // Load saved notes when app starts
    },
    methods: {
        // All our functions go here
        addStickie() {
            this.stickies.push({
                text: '',              // Empty text to start
                color: '#fcfa5d',      // Default yellow color
                id: Date.now()         // Unique ID using timestamp
            });
        },
        deleteStickie(index) {
            if (this.stickies[index].text.trim() === '') {
                this.stickies.splice(index, 1);
            }
        },
        changeColor(index) {
            const colors = ['#fcfa5d', '#6eed2a', '#f989d6', '#20dff8',
                '#ff9999', '#99ff99', '#9999ff', '#ffcc99'];
            const currentColor = this.stickies[index].color;
            const currentIndex = colors.indexOf(currentColor);
            const newColorIndex = (currentIndex + 1) % colors.length;
            this.stickies[index].color = colors[newColorIndex];
        },
        saveToStorage() {
            try {
                localStorage.setItem(this.storageKey, JSON.stringify(this.stickies));
                console.log('Data saved to localStorage');
            } catch (error) {
                console.error('Failed to save to localStorage:', error);
            }
        },
        loadFromStorage() {
            try {
                const stored = localStorage.getItem(this.storageKey);
                if (stored) {
                    this.stickies = JSON.parse(stored);
                    console.log('Data loaded from localStorage');
                }
            } catch (error) {
                console.error('Failed to load from localStorage:', error);
                this.stickies = [];
            }
        },
        clearStorage() {
            localStorage.removeItem(this.storageKey);
            this.stickies = [];
            console.log('Storage cleared');
        },
        onDragStart(event, index) {
            this.draggedIndex = index;                    // Remember which note we're dragging
            event.dataTransfer.effectAllowed = 'move';    // Set the drag effect type
            event.target.classList.add('dragging');      // Add CSS class for visual feedback
        },
        onDragEnd(event) {
            event.target.classList.remove('dragging');   // Remove visual feedback
            this.draggedIndex = null;                     // Clear the dragged index
        },
        onDragOver(event) {
            event.preventDefault();                       // MUST do this to allow dropping
            event.dataTransfer.dropEffect = 'move';     // Show move cursor
        },
        onDragEnter(event) {
            event.preventDefault();                       // Also required for drag and drop
        },
        onDrop(event, targetIndex) {
            event.preventDefault();

            if (this.draggedIndex !== null && this.draggedIndex !== targetIndex) {
                // Remove the dragged item from its current position
                const draggedItem = this.stickies.splice(this.draggedIndex, 1)[0];

                // Insert it at the new position
                this.stickies.splice(targetIndex, 0, draggedItem);
            }
        }
    },
    watch: {
        stickies: {
            handler() {
                this.saveToStorage();  // Automatically save when notes change
            },
            deep: true                 // Watch for changes inside the objects in our array
        }
    }
}).mount('#app');