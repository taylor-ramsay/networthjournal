
document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.datepicker');
  var options = {
    // onClose: () => {
    //   let date = document.getElementById('date')
    //   date.setAttribute("value", date.value)
    // }
  }
  var instances = M.Datepicker.init(elems, options);
});