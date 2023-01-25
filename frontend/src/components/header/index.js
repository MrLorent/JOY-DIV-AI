const header = () => {
    //if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark'); //add this
    // }
    // else {
    //     document.documentElement.setAttribute('data-theme', 'light');
    //     localStorage.setItem('theme', 'light'); //add this
    // }   

    return (
        <header className="w-full h-[var(--header-height)] flex items-center fixed top-0 px-5">
            <h1>{">_ QUANTUN POETRY"}</h1>
        </header>
    );
}

export default header;