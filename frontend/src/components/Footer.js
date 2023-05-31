const Footer = () => {
    //if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark'); //add this
    // }
    // else {
    //     document.documentElement.setAttribute('data-theme', 'light');
    //     localStorage.setItem('theme', 'light'); //add this
    // }   

    return (
        <footer className="w-full h-[var(--footer-height)] flex justify-center items-center fixed bottom-0 px-6 border-t border-tertiary">
            <span className="text-secondary text-sm">Website created by <a target="_blank" href="https://www.tanguylorent.com">Tanguy Lorent</a></span>
        </footer>
    );
}

export default Footer;