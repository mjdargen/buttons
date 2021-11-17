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
  qty.type = "text"
  qty_cell.appendChild(qty);

}

function deleteRow() {
  document.getElementById("pic_table").deleteRow(-1);
}

// <form action="" id="pic_form1">
// <td> <label for="file1">Upload image:</label>
//   <input type="file" accept="image/*" id="img1" onchange="loadPreview(event, this.id)">
// <td><img id="preview1" width="200"/></td>
// <td><div id="picker"></div></td>
// <td><input type="text" id="qty1" name="qty1"></td>
// </form>
