// Помечаем широкие таблицы (3+ колонок) и вешаем на ячейки подписи колонок,
// чтобы на телефоне их можно было показать компактными карточками.
// document$ эмитит на каждой загрузке страницы, включая instant-навигацию.
document$.subscribe(function () {
  document.querySelectorAll(".md-typeset table:not([class])").forEach(function (table) {
    var headers = Array.prototype.map.call(
      table.querySelectorAll("thead th"),
      function (th) { return th.textContent.trim(); }
    );
    if (headers.length < 3) return;
    table.classList.add("responsive-table");
    table.querySelectorAll("tbody tr").forEach(function (tr) {
      Array.prototype.forEach.call(tr.children, function (td, i) {
        if (headers[i]) td.setAttribute("data-label", headers[i]);
      });
    });
  });
});
