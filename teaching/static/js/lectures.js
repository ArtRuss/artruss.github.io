toggleResourcesLectures('lec-special-talk','Geometric_Transformations')
function toggleResourcesLectures(id, unit) {
    console.log(id)
    console.log(unit)
    const caret = document.getElementById(`caret-${id}`);
    const resourcesRow = document.getElementById(`resources-${id}`);
    const unitCell = document.getElementById(`unit-cell-${unit}`);
    console.log(unitCell)

    if (resourcesRow.style.display === 'table-row') {
        caret.classList.remove('fa-caret-down');
        caret.classList.add('fa-caret-right');

        if (unitCell) { unitCell.rowSpan = unitCell.rowSpan - 1; }
        resourcesRow.style.display = 'none';
    } else {
        caret.classList.remove('fa-caret-right');
        caret.classList.add('fa-caret-down');

        if (unitCell) { unitCell.rowSpan = unitCell.rowSpan + 1; }
        resourcesRow.style.display = 'table-row';
    }
}