function loadDashboard() {
  document.querySelector(".main-container").innerHTML = `
       <div class="main-title">
                <h2>DASHBOARD</h2>
            </div>

            <div class="main-cards">

                <div class="card">
                    <div class="card-inner">
                        <h3>BRACLETS CONNECTEES</h3>
                        <span class="material-icons-outlined">inventory_2</span>
                    </div>
                    <h1>249</h1>
                </div>

                <div class="card">
                    <div class="card-inner">
                        <h3>CATEGORIES</h3>
                        <span class="material-icons-outlined">category</span>
                    </div>
                    <h1>25</h1>
                </div>

                <div class="card">
                    <div class="card-inner">
                        <h3>LES PATIENTS</h3>
                        <span class="material-icons-outlined">groups</span>
                    </div>
                    <h1>1500</h1>
                </div>

                <div class="card">
                    <div class="card-inner">
                        <h3>ALERTES</h3>
                        <span class="material-icons-outlined">notification_important</span>
                    </div>
                    <h1>56</h1>
                </div>

            </div>

            <div class="charts">



                <div class="charts-card">
                    <h2 class="chart-title">Bilan Medicale</h2>
                    <div id="area-chart"></div>
                </div>

            </div>
    `;
}

function loadBracelets() {
  // You can fetch content from a server or load HTML content dynamically
  // For example:
  fetch("/bracelet")
    .then((response) => response.text())
    .then((data) => {
      document.querySelector(".main-container").innerHTML = data;
    })
    .catch((error) => console.error("Error:", error));
}
// Other functions for loading different pages similarly
