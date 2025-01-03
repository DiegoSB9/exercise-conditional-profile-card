import "../style/index.css";

/**
 *  EDIT ONLY INSIDE THIS RENDER FUNCTION
 *  This function is called every time the user changes types or changes any input
 * 
    {
        includeCover: true, // if includeCover is true the algorithm should show the cover image
        background: "https://images.unsplash.com/photo-1511974035430-5de47d3b95da", // this is the image's url that will be used as a background for the profile cover
        avatarURL: "https://randomuser.me/api/portraits/women/42.jpg", // this is the url for the profile avatar
        socialMediaPosition: "right", // social media bar position (left or right)
        
        twitter: null, // social media usernames
        github: null,
        linkedin: null,
        instagram: null,

        name: null,
        lastName: null,
        role: null,
        country: null,
        city: null
    }
 */
function render(variables = {}) {
  console.log("Variables actuales: ", variables);

  // Portada
  let cover = variables.includeCover
    ? `<div class="cover"><img src="${variables.background ||
        "https://via.placeholder.com/800x200"}" /></div>`
    : `<div class="cover"></div>`;

  // Nombre completo
  let fullName = `${variables.name || "Name"} ${variables.lastName ||
    "Last Name"}`;

  // Obtenemos la posición desde las variables o del select si no está definida
  let socialMediaPositionClass =
    variables.socialMediaPosition ||
    document.querySelector('[for="socialMediaPosition"]').value;

  // Íconos de redes sociales
  // Íconos de redes sociales
  let socialMediaLinks = `
<li>
  <a href="${
    variables.twitter
      ? `https://twitter.com/${variables.twitter}`
      : "https://twitter.com/"
  }" 
     class="${variables.twitter ? "" : "disabled"}">
    <i class="fab fa-twitter"></i>
  </a>
</li>
<li>
  <a href="${
    variables.github
      ? `https://github.com/${variables.github}`
      : "https://github.com/"
  }" 
     class="${variables.github ? "" : "disabled"}">
    <i class="fab fa-github"></i>
  </a>
</li>
<li>
  <a href="${
    variables.linkedin
      ? `https://linkedin.com/in/${variables.linkedin}`
      : "https://linkedin.com/in/"
  }" 
     class="${variables.linkedin ? "" : "disabled"}">
    <i class="fab fa-linkedin"></i>
  </a>
</li>
<li>
  <a href="${
    variables.instagram
      ? `https://instagram.com/${variables.instagram}`
      : "https://instagram.com/"
  }" 
     class="${variables.instagram ? "" : "disabled"}">
    <i class="fab fa-instagram"></i>
  </a>
</li>
`;

  document.querySelector("#widget_content").innerHTML = `
      <div class="widget">
        ${cover}
        <img src="${variables.avatarURL ||
          "https://via.placeholder.com/150"}" class="photo" />
        <h1>${fullName}</h1>
        <h2>${variables.role || "Role"}</h2>
        <h3>${variables.city || "City"}, ${variables.country || "Country"}</h3>
        <ul class="position-${socialMediaPositionClass}">
          ${socialMediaLinks}
        </ul>
      </div>
    `;

  document.querySelector(
    '[for="socialMediaPosition"]'
  ).value = socialMediaPositionClass;
}

/**
 * Don't change any of the lines below, here is where we do the logic for the dropdowns
 */
window.onload = function() {
  window.variables = {
    // if includeCover is true the algorithm should show the cover image
    includeCover: true,
    // this is the image's url that will be used as a background for the profile cover
    background: "https://images.unsplash.com/photo-1511974035430-5de47d3b95da",
    // this is the url for the profile avatar
    avatarURL: "https://randomuser.me/api/portraits/women/42.jpg",
    // social media bar position (left or right)
    socialMediaPosition: "position-left",
    // social media usernames
    twitter: null,
    github: null,
    linkedin: null,
    instagram: null,
    name: null,
    lastName: null,
    role: null,
    country: null,
    city: null
  };
  render(window.variables); // render the card for the first time

  document.querySelectorAll(".picker").forEach(function(elm) {
    elm.addEventListener("change", function(e) {
      // <- add a listener to every input
      const attribute = e.target.getAttribute("for"); // when any input changes, collect the value
      let values = {};
      values[attribute] =
        this.value == "" || this.value == "null"
          ? null
          : this.value == "true"
          ? true
          : this.value == "false"
          ? false
          : this.value;
      render(Object.assign(window.variables, values)); // render again the card with new values
    });
  });
};
