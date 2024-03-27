let content = [
    {
        'authorimg': '',
        'author': '',
        'image': '',
        'description': '',
        'posttime': '',
        'comments': [],
        'isliked': false,
        'likes': [],
    }
];

function openDialog() {
    document.getElementById('dialog').classList.remove('d_none')
}
function closeDialog() {
    document.getElementById('dialog').classList.add('d_none')
}