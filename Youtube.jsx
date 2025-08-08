import React, { useState } from "react";
import axios from "axios";



const Youtube = () => {
  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);

  const handleSearch = () => {
    if (!search.trim()) return;
    axios
      .get("https://www.googleapis.com/youtube/v3/search", {
        params: {
          q: search,
          key: "AIzaSyB9cTBeAUiC2rLR0NtDE8z3Ji-w-ztuAJU",
          part: "snippet",
          maxResults: 9,
        },
      })
      .then((response) => setResult(response.data.items))
      .catch((error) => console.log(error));
  };

  return (
    <div className="container my-5">
     <h2 className="text-center mb-4 fw-bold text-dark" style={{ textShadow: "1px 1px 2px #000" }}>
  
  YouTube
</h2>


      <div className="row justify-content-center mb-5">
        <div className="col-md-8">
          <div className="input-group shadow-lg rounded-4 overflow-hidden bg-white bg-opacity-75 p-2">
            <input
              type="text"
              placeholder="🔍 Search YouTube videos..."
              className="form-control border-0 bg-transparent fw-semibold"
              style={{ backdropFilter: "blur(5px)" }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              className="btn btn-danger fw-bold px-4"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="row g-4">
        {result.map((item, index) => (
          <div className="col-md-4" key={index}>
            <div
              className="card border-0 shadow-lg rounded-4 h-100"
              style={{
                transition: "transform 0.3s",
                transform: "scale(1)",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.03)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <iframe
                className="card-img-top rounded-top-4"
                height="200"
                src={`https://www.youtube.com/embed/${item.id.videoId}`}
                title={item.snippet.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <div className="card-body">
                <h6 className="card-title fw-bold">{item.snippet.title}</h6>
                <p className="card-text small text-muted mb-0">
                  {item.snippet.channelTitle}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Youtube;