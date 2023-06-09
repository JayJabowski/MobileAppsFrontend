export const LocalServiceWorkerRegister = () => {
    const swPath = `${process.env.PUBLIC_URL}/sw-build.js`;
    if( 'serviceWorker' in navigator && process.env.NODE_ENV !== 'production') {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register(swPath).then(registration => {
                console.log("Servicer Worker registered");
                console.dir(registration);
            })
        })
    }
}