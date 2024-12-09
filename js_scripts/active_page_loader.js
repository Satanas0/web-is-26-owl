function active_page_loader(){
    let active = 0;
    for (let i = 0; i < document.links.length; i++) {
        if (document.links[i].href === document.URL) {
            active = i;
            break;
        }
    }
    document.links[active].className = 'active_b';
    console.log(document.links[active]);
}

document.addEventListener('DOMContentLoaded', async () => {
    await active_page_loader()

    return true
});