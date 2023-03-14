export const mixins = {
  methods: {
    swap(arr, i, j) {
      [arr[i], arr[j]] = [arr[j], arr[i]]
    },
    exportRaw(name, data) {
      var urlObject = window.URL || window.webkitURL || window;
      var export_blob = new Blob([data]);
      var save_link = document.createElementNS("http://www.w3.org/1999/xhtml", "a")
      save_link.href = urlObject.createObjectURL(export_blob);
      save_link.download = name;
      var ev = document.createEvent("MouseEvents");
      ev.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
      save_link.dispatchEvent(ev);
    },
    timestampToTime(timestamp) {
      var date = new Date(timestamp);
      var Y = date.getFullYear() + '-';
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
      var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate() + ' ';
      var hh = date.getHours() < 10 ? '0' + date.getHours() : date.getHours() + ':';
      var mm = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes() + ':';
      var ss = date.getSeconds() < 10 ? '0' + date.getDate() : date.getSeconds() ;
      return Y + M + D + " " + hh + mm + ss;
    }
  }
}
