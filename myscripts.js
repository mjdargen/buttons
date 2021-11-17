var row_count = 0;

// load image preview
var loadPreview = function(event, id) {
  var image = document.getElementById('preview' + id.match(/\d+/)[0]);
  image.src = URL.createObjectURL(event.target.files[0]);
};


// load color picker
function loadColorPicker() {
  var colorPicker = new iro.ColorPicker("#picker", {
    width: 200,
  });
};

// add row to table
function addRow() {
  var table = document.getElementById("pic_table");
  // insert row
  var row = table.insertRow(-1);
  row_count += 1;
  row.id = 'row' + row_count;


  // insert upload file
  var pic_cell = row.insertCell(0);
  var file = document.createElement("input");
  file.id = "file" + row_count;
  file.type = "file"
  file.class = "upload"
  file.addEventListener(
     'change',
     function() { loadPreview(event, this.id); },
     false
  );
  pic_cell.appendChild(file);

  // insert preview
  var prev_cell = row.insertCell(1);
  var img = document.createElement("img");
  img.id = "preview" + row_count;
  img.width = 200;
  prev_cell.appendChild(img)

  // insert color
  var color_cell = row.insertCell(2);
  var div = document.createElement("div");
  div.id = "picker" + row_count;
  color_cell.appendChild(div);
  var colorPicker = new iro.ColorPicker("#picker" + row_count, {
    width: 200,
  });

  // insert quantity
  var qty_cell = row.insertCell(3);
  var qty = document.createElement("input");
  qty.id = "qty" + row_count;
  qty.type = "number";
  qty.step = "1";
  qty.min = "0";  // limit to positive numbers
  qty.onkeypress = function(event) {  // limit to keystrokes
      return (event.charCode !=8 && event.charCode ==0 || (event.charCode >= 48 && event.charCode <= 57));
   };
  qty_cell.appendChild(qty);

}

function deleteRow() {
  document.getElementById("pic_table").deleteRow(-1);
}

function generate() {

  // count the total number of images/pages
  var num_images = 0;
  for (var i = 1; i <= row_count; i++) {
    var qty = document.getElementById("qty" + i);
    num_images += Number(qty.value)
  }
  // window.alert(num_images);
  var num_pages = Math.ceil(num_images / 20);

  // window.alert(num_pages);

  // generate page divs
  for (var i = 1; i <= num_pages; i++) {
    var div = document.getElementById("print_container");
    var page = document.createElement("div");
    page.id = "page" + i;
    // page.class = "print_page";
    page.setAttribute("class", "print_page");
    div.appendChild(page);
  }

  // for every row, get to work
  for (var i = 1; i <= 20; i++) {
    var div = document.getElementById("page1");
    // item->dot->center->graphic->img (center)
    // var item = document.createElement("div");
    // item.setAttribute("class", "item");
    // div.appendChild(item);
    var dot = document.createElement("span");
    dot.setAttribute("class", "dot");
    dot.style["background-color"] = "#FFFFFF";
    div.appendChild(dot);
    var center_div = document.createElement("div");
    center_div.setAttribute("class", "center");
    dot.appendChild(center_div);
    var graphic = document.createElement("img");
    graphic.setAttribute("class", "graphic");
    center_div.appendChild(graphic);
    var image = document.getElementById('preview1');
    graphic.src = image.src;
  }


  // generate pdf
  // const { jsPDF } = window.jspdf;
  // const doc = new jsPDF();
  // doc.text("Hello world!", 10, 10);
  // doc.save("a4.pdf");
  /*// doc.autoPrint();
  // doc.output("dataurlnewwindow");*/


  // var doc = new jsPDF();
  // var image = document.getElementById('preview1');
  // doc.setFontSize(40);
  // doc.text("Octonyan loves jsPDF", 35, 25);
  // doc.addImage(image.src, "JPEG", 15, 40, 180, 180);
  // doc.save("a4.pdf");


  // let mywindow = window.open('', 'PRINT', 'height=650,width=900,top=100,left=150');
  //
  // mywindow.document.write(`<html><head><title>${title}</title>`);
  // mywindow.document.write('</head><body >');
  // mywindow.document.write(document.getElementById(divId).innerHTML);
  // mywindow.document.write('</body></html>');
  //
  // mywindow.document.close(); // necessary for IE >= 10
  // mywindow.focus(); // necessary for IE >= 10*/
  //
  // mywindow.print();
  // mywindow.close();

  var contents = document.getElementById("print_container").outerHTML;
  var print = window.open('', '', 'height=400,width=800');
  print.document.write('<html><head><title>DIV Contents</title>');
  print.document.write('<link rel="stylesheet" href="mystyle.css">')
  print.document.write('<link rel="stylesheet" href="button_style.css">')
  print.document.write('</head><body>');
  print.document.write(contents);
  print.document.write('</body></html>');
  print.document.close();
  print.print();

  // var elementHandler = {
  //   '#ignorePDF': function (element, renderer) {
  //     return true;
  //   }
  // };
  // doc.fromHTML(
  //     source,
  //     15,
  //     15,
  //     {
  //       'width': 180,'elementHandlers': elementHandler
  //     });
  // // doc.save("test.pdf");
  // doc.output("dataurlnewwindow");




}

// <form action="" id="pic_form1">
// <td> <label for="file1">Upload image:</label>
//   <input type="file" accept="image/*" id="img1" onchange="loadPreview(event, this.id)">
// <td><img id="preview1" width="200"/></td>
// <td><div id="picker"></div></td>
// <td><input type="text" id="qty1" name="qty1"></td>
// </form>
