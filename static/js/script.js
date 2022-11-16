const clicks = document.querySelectorAll(".click");
const sections = document.querySelectorAll("section");
const firstTop = sections[0].offsetTop;
const secondTop = sections[1].offsetTop;
const thirdTop = sections[2].offsetTop;

clicks[0].onclick = function () {
  window.scroll({ top: firstTop, behavior: "smooth" });
};
clicks[1].onclick = function () {
  window.scroll({ top: secondTop, behavior: "smooth" });
};
clicks[2].onclick = function () {
  window.scroll({ top: thirdTop, behavior: "smooth" });
};

// db
$(document).ready(function () {
  show_comment();
});

function show_comment() {
  $("#comment-list").empty();
  const target = "김승일";
  $.ajax({
    type: "GET",
    url: "/comment",
    data: { target },
    success: function (response) {
      const comments = response["data"];
      comments.forEach((comment) => {
        let temp_html = `
                         <div class="card">
                                            <div class="card-body">
                                                <blockquote class="blockquote mb-0">
                                                    <p>${comment.author}</p>
                                                    <footer class="blockquote-footer">${comment.contents}</footer>
                                                    <button onclick="delete_comment(${comment.num})" type="button" class="btn btn-dark">삭제</button>
                                                </blockquote>
                                            </div>
                                        </div>
                        `;
        $("#comment-list").append(temp_html);
      });
    },
  });
}
function save_comment() {
  const target = "김승일";
  const author = document.querySelector("#author").value;
  const contents = document.querySelector("#contents").value;

  $.ajax({
    type: "POST",
    url: "/comment",
    data: { target, author, contents },
    success: function (response) {
      alert(response["msg"]);
      // window.location.reload();
      show_comment();
    },
  });
}
function delete_comment(num) {
  $.ajax({
    type: "DELETE",
    url: "/comment",
    data: { num },
    success: function (response) {
      alert(response["msg"]);
      show_comment();
    },
  });
}
