// Selecting Elements
const usernameInput = document.getElementById("usernameInput");
const searchBtn = document.getElementById("searchBtn");
const profileSection = document.getElementById("profileSection");

const avatar = document.getElementById("avatar");
const name = document.getElementById("name");
const username = document.getElementById("username");
const bio = document.getElementById("bio");

const repos = document.getElementById("repos");
const followers = document.getElementById("followers");
const following = document.getElementById("following");

const profileLink = document.getElementById("profileLink");

// Additional Profile Elements
const locationElement = document.getElementById("location");
const companyElement = document.getElementById("company");
const blogElement = document.getElementById("blog");


// Search Button Event
searchBtn.addEventListener("click", () => {

    const user = usernameInput.value.trim();

    if (user === "") {
        alert("Please enter a GitHub username!");
        usernameInput.focus();
        return;
    }

    getGitHubProfile(user);

});


// Enter Key Support
usernameInput.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {
        searchBtn.click();
    }

});


// Fetch GitHub Profile
async function getGitHubProfile(user) {

    try {

        // Hide Previous Profile
        profileSection.style.display = "none";

        // Loading State
        searchBtn.textContent = "Searching...";
        searchBtn.disabled = true;

        // GitHub API Request
        const response = await fetch(
            `https://api.github.com/users/${encodeURIComponent(user)}`
        );

        // Error Handling
        if (!response.ok) {

            if (response.status === 404) {
                throw new Error("GitHub User Not Found!");
            }

            if (response.status === 403) {
                throw new Error("API rate limit exceeded. Try again later!");
            }

            throw new Error("Something went wrong. Please try again!");

        }

        // Convert Response into JSON
        const data = await response.json();


        // Display Profile Information
        avatar.src = data.avatar_url;

        avatar.onerror = () => {
            avatar.src = "https://placehold.co/120x120?text=User";
        };

        name.textContent = data.name || data.login;

        username.textContent = `@${data.login}`;

        bio.textContent = data.bio || "No bio available";


        // Display Statistics
        repos.textContent = data.public_repos;

        followers.textContent = data.followers;

        following.textContent = data.following;


        // Additional Profile Details

        // Location
        if (locationElement) {
            locationElement.textContent =
                `📍 ${data.location || "Not available"}`;
        }

        // Company
        if (companyElement) {
            companyElement.textContent =
                `🏢 ${data.company || "Not available"}`;
        }

        // Website
        if (blogElement) {

            blogElement.textContent = data.blog
                ? `🌐 ${data.blog}`
                : "🌐 No website available";

            blogElement.style.cursor = data.blog
                ? "pointer"
                : "default";

            blogElement.onclick = () => {

                if (data.blog) {

                    const website = data.blog.startsWith("http")
                        ? data.blog
                        : `https://${data.blog}`;

                    window.open(
                        website,
                        "_blank",
                        "noopener,noreferrer"
                    );

                }

            };

        }


        // GitHub Profile Link
        profileLink.href = data.html_url;

        profileLink.target = "_blank";

        profileLink.rel = "noopener noreferrer";


        // Show Profile Card
        profileSection.style.display = "block";


        // Clear Search Input
        usernameInput.value = "";

        // Focus Search Input
        usernameInput.focus();


    } catch (error) {

        profileSection.style.display = "none";

        alert(error.message);

    } finally {

        // Reset Search Button
        searchBtn.textContent = "Search";

        searchBtn.disabled = false;

    }

}