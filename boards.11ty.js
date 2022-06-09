exports.data = {
  pagination: {
    data: "boards",
    size: 1,
    alias: 'board'
  },
  eleventyComputed: {
    permalink: data => `boards/${ data.board.player.toLowerCase() }/`
  }
};

exports.render = function(data) {
  return `<h1>${data.board.player}</h1>
  <ol>
    ${data.board.challenges.map(function(item) {
        return `<li>${item}</li>`;
      }).join("")
    }
  </ol>`;
};