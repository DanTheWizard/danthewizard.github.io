"use strict";

// Loads fluid.min.js if needed, creates a full-viewport canvas behind the page
// and initializes the Fluid simulation as the backmost background.
async function loadFluidBackground() {
    try {
        // console.log('[fluid_loader] DOMContentLoaded, running loader...');
        // Load library if not already present
        if (typeof Fluid === "undefined") {
            // console.log('[fluid_loader] Fluid not found, loading fluid.min.js...');
            await loadScript('src/js/fluid.min.js');
        }

        // Create canvas element if it doesn't exist
        let fluidcanvas = document.getElementById('fluid-canvas');
        if (!fluidcanvas) {
            fluidcanvas = document.createElement('canvas');
            fluidcanvas.id = 'fluid-canvas';
            document.body.prepend(fluidcanvas);
            // console.log('[fluid_loader] Created #fluid-canvas');
        } else {
            // console.log('[fluid_loader] #fluid-canvas already exists');
        }

        function resizeCanvas() {
            // Match the canvas resolution to devicePixelRatio for crisp rendering
            fluidcanvas.width = Math.round(fluidcanvas.clientWidth * (window.devicePixelRatio || 1));
            fluidcanvas.height = Math.round(fluidcanvas.clientHeight * (window.devicePixelRatio || 1));
        }

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        const fluid = new Fluid(fluidcanvas);

        fluid.mapBehaviors({
            // sim_resolution: 128,
            // dye_resolution: 512,

            paused: false,
            embedded_dither: true,

            dissipation: .97,
            velocity: .98,
            pressure: .8,
            pressure_iteration: 20,
            curl: 0,
            emitter_size: 0.5,

            render_shaders: true,
            multi_color: true,

            render_bloom: false,
            bloom_iterations: 8,
            bloom_resolution: 256,
            intensity: 0.8,
            threshold: 0.6,
            soft_knee: 0.7,

            background_color: { r: 0, g: 0, b: 0 },
            transparent: true
        });


        fluid.activate();

        
        // Force the pointer to always be "pressed"
        const pointer = fluid.pointers[0]; 
        pointer.down = true;

        function moveFluidPointer(clientX, clientY) {
            // Update the simulation's internal pointer coordinates directly
            // Use clientX/Y so the coordinates match the fixed-position canvas
            pointer.texcoordX = clientX / window.innerWidth;
            pointer.texcoordY = 1.0 - clientY / window.innerHeight;
            
            // Also update the 'prev' coordinates to prevent "teleporting" streaks
            pointer.prevTexcoordX = pointer.texcoordX;
            pointer.prevTexcoordY = pointer.texcoordY;
            
            // Dispatch the event if the library needs a trigger
            fluidcanvas.dispatchEvent(new MouseEvent('mousemove', {
                clientX,
                clientY
            }));
        }

        // Listen to the global window for movement
        window.addEventListener('mousemove', (e) => {
            moveFluidPointer(e.clientX, e.clientY);
        });

        // Also support touch input for mobile devices
        window.addEventListener('touchstart', (e) => {
            const touch = e.touches[0];
            if (!touch) return;

            moveFluidPointer(touch.clientX, touch.clientY);
        }, { passive: true });

        window.addEventListener('touchmove', (e) => {
            const touch = e.touches[0];
            if (!touch) return;

            moveFluidPointer(touch.clientX, touch.clientY);
        }, { passive: true });

    } catch (err) {
        console.error('[fluid_loader] Error:', err);
    }
}

// document.addEventListener('DOMContentLoaded', loadFluidBackground);
loadFluidBackground();
