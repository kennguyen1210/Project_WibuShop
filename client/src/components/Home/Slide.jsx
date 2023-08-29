function Slide() {
  return (
    <div className="slide_buy">
      <div
        id="carouselExampleIndicators"
        className="carousel slide slide-content"
        data-bs-ride="true"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to={0}
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          />
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to={1}
            aria-label="Slide 2"
          />
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to={2}
            aria-label="Slide 3"
          />
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to={3}
            aria-label="Slide 3"
          />
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to={4}
            aria-label="Slide 3"
          />
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="https://ecdn.game4v.com/g4v-content/uploads/2018/01/shamanking.jpg"
              className="d-block w-100"
              alt="samanking"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://genk.mediacdn.vn/thumb_w/660/139269124445442048/2020/4/22/1-15875299157179953930.jpg"
              className="d-block w-100"
              alt="one punch man"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://truyenvnmoi.net/tin/wp-content/uploads/2023/06/manga-moi-nhat-baki-the-grappler-ket-thuc.jpeg"
              className="d-block w-100"
              alt="Baki"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://i.bbcosplay.com/11775/DSC_4603.jpg.webp"
              className="d-block w-100"
              alt="kimetsu"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://cdn.cloudflare.steamstatic.com/steam/apps/1201240/ss_464af8ae35e3a4ee8443286efc43b1e94ba5e517.600x338.jpg?t=1690102124"
              className="d-block w-100"
              alt="bleach"
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <div className="slide-right">
        <div
          id="carouselExampleRide1"
          className="carousel slide slide-content1"
          data-bs-ride="true"
        >
          <div className="carousel-inner">
            <div className="carousel-item active ">
              <img
                src="https://cdn.cloudflare.steamstatic.com/steam/apps/1201240/ss_464af8ae35e3a4ee8443286efc43b1e94ba5e517.600x338.jpg?t=1690102124"
                className="d-block w-100"
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://cdn.cloudflare.steamstatic.com/steam/apps/1201240/ss_464af8ae35e3a4ee8443286efc43b1e94ba5e517.600x338.jpg?t=1690102124"
                className="d-block w-100"
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://cdn.cloudflare.steamstatic.com/steam/apps/1201240/ss_464af8ae35e3a4ee8443286efc43b1e94ba5e517.600x338.jpg?t=1690102124"
                className="d-block w-100"
                alt="..."
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleRide1"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleRide1"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="visually-hidden">Next</span>
          </button>
        </div>

        <div
          id="carouselExampleRide"
          className="carousel slide slide-content1"
          data-bs-ride="true"
        >
          <div className="carousel-inner">
            <div className="carousel-item active ">
              <img
                src="https://genk.mediacdn.vn/thumb_w/660/139269124445442048/2020/4/22/1-15875299157179953930.jpg"
                className="d-block w-100"
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://genk.mediacdn.vn/thumb_w/660/139269124445442048/2020/4/22/1-15875299157179953930.jpg"
                className="d-block w-100"
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://genk.mediacdn.vn/thumb_w/660/139269124445442048/2020/4/22/1-15875299157179953930.jpg"
                className="d-block w-100"
                alt="..."
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleRide"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleRide"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Slide;
