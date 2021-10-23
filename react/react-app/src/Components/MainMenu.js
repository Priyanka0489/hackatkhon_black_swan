const MainMenu = () => {
  return (
    <>
      {/*<link*/}
      {/*  href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css"*/}
      {/*  rel="stylesheet"*/}
      {/*  id="bootstrap-css"*/}
      {/*>*/}
      {/*  <script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/js/bootstrap.min.js" />*/}
      {/*  <script src="//code.jquery.com/jquery-1.11.1.min.js" />*/}

      <div class="col-lg-6 col-sm-6">
        <div className="card hovercard">
          <div className="card-background">
            <img
              className="card-bkimg"
              alt=""
              src="http://lorempixel.com/100/100/people/9/"
            />
          </div>
          <div className="useravatar">
            <img alt="" src="http://lorempixel.com/100/100/people/9/" />
          </div>
          <div className="card-info">
            <span className="card-title">Pamela Anderson</span>
          </div>
        </div>
        <div
          className="btn-pref btn-group btn-group-justified btn-group-lg"
          role="group"
          aria-label="..."
        >
          <div className="btn-group" role="group">
            <button
              type="button"
              id="stars"
              className="btn btn-primary"
              href="#tab1"
              data-toggle="tab"
            >
              <span className="glyphicon glyphicon-star" aria-hidden="true" />
              <div className="hidden-xs">Stars</div>
            </button>
          </div>
          <div className="btn-group" role="group">
            <button
              type="button"
              id="favorites"
              className="btn btn-default"
              href="#tab2"
              data-toggle="tab"
            >
              <span className="glyphicon glyphicon-heart" aria-hidden="true" />
              <div className="hidden-xs">Favorites</div>
            </button>
          </div>
          <div className="btn-group" role="group">
            <button
              type="button"
              id="following"
              className="btn btn-default"
              href="#tab3"
              data-toggle="tab"
            >
              <span
                className="glyphicon glyphicon-user"
                aria-hidden="true"
              ></span>
              <div className="hidden-xs">Following</div>
            </button>
          </div>
        </div>

        <div className="well">
          <div className="tab-content">
            <div className="tab-pane fade in active" id="tab1">
              <h3>This is tab 1</h3>
            </div>
            <div className="tab-pane fade in" id="tab2">
              <h3>This is tab 2</h3>
            </div>
            <div className="tab-pane fade in" id="tab3">
              <h3>This is tab 3</h3>
            </div>
          </div>
        </div>
      </div>
      {/*</link>*/}
    </>
  );
};
export default MainMenu;
