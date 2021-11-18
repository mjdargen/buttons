var row_count = 0;
var pickers = [];

// load image preview
var loadPreview = function(event, id) {
  var image = document.getElementById('preview' + id.match(/\d+/)[0]);
  image.src = URL.createObjectURL(event.target.files[0]);
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
  // insert span, div, and input for values
  var span = document.createElement("span");
  span.value = "Selected Color:";
  color_cell.appendChild(span);
  var color_values = document.createElement("div");
  color_values.id = "color_values" + row_count;
  color_cell.appendChild(color_values);
  var hex = document.createElement("input");
  hex.id = "hexInput" + row_count;
  color_cell.appendChild(hex);
  var temp = new iro.ColorPicker("#picker" + row_count, {
    width: 200,
  });
  pickers.push(temp)

  // add display for values and hex input field
  var values = document.getElementById("color_values" + row_count);
  var hexInput = document.getElementById("hexInput" + row_count);
  // https://iro.js.org/guide.html#color-picker-events
  temp.on(["color:init", "color:change"], function(color){
    values.innerHTML = [
      "hex: " + color.hexString,
      "rgb: " + color.rgbString,
      "hsl: " + color.hslString,
    ].join("<br>");
    hexInput.value = color.hexString;
  });
  hexInput.addEventListener('change', function() {
    temp.color.hexString = this.value;
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

// remove row
function deleteRow() {
  document.getElementById("pic_table").deleteRow(-1);
}


// generate pdf
function generate() {

  // count the total number of images/pages
  var num_images = 0;
  for (var i = 1; i <= row_count; i++) {
    var qty = document.getElementById("qty" + i);
    num_images += Number(qty.value)
  }
  var num_pages = Math.ceil(num_images / 20);

  // generate page divs
  for (var i = 1; i <= num_pages; i++) {
    var div = document.getElementById("print_container");
    var page = document.createElement("div");
    page.id = "page" + i;
    page.setAttribute("class", "print_page");
    div.appendChild(page);
  }

  // for every row, get to work
  pin_count = 0;
  for (var i = 1; i <= row_count; i++) {
    var qty = document.getElementById("qty" + i).value
    for (var j = 0; j < qty; j++) {
      page_num = Math.ceil((pin_count+1) / 20);
      var div = document.getElementById("page" + page_num);

      // dot->center->graphic->img (center)
      // dot
      var dot = document.createElement("span");
      dot.setAttribute("class", "dot");
      dot.style["background-color"] = pickers[i - 1].color.hexString;
      div.appendChild(dot);
      // center
      var center_div = document.createElement("div");
      center_div.setAttribute("class", "center");
      dot.appendChild(center_div);
      // graphic
      var graphic = document.createElement("img");
      graphic.setAttribute("class", "graphic");
      center_div.appendChild(graphic);
      // image
      var image = document.getElementById('preview' + i);
      graphic.src = image.src;

      pin_count++;
    }
  }

  // create window to print and open up dialog box
  var contents = document.getElementById("print_container").innerHTML;
  var print = window.open('', '', 'height=400,width=800');
  print.document.write('<html><head><title>Buttons</title>');
  print.document.write('<link rel="stylesheet" href="mystyle.css">')
  print.document.write('<link rel="stylesheet" href="button_style.css">')
  print.document.write('</head><body>');
  print.document.write(contents);
  print.document.write('</body></html>');
  print.document.close();
  print.focus();
  setTimeout(function(){}, 2000); 
  print.print();

  // remove so it can be done again
  var parent = document.getElementById("print_container");
  while (parent.hasChildNodes()) {
    parent.removeChild(parent.lastChild);
  }

}
