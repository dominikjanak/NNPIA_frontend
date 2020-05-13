import React, {useState} from "react";
import {QuoteTools} from "./QuoteTools";
import StarRatings from "react-star-ratings";

const Quote = ({data, removeHandler, ratingHandler}) => {
  const [rating, setRating] = useState(isNaN(data.score)? 0 : data.score)
  const [rated, setRated] = useState(data.uservoted)
  const [userscore, setUserScore] = useState(data.userscore)

    return (
      <div className="quote-item clearfix my-3 py-3 px-4" id={"q" + data.id}>
        <div className="clearfix">
          <div className="float-left categories">
            {data.categories.map((item, index) => (
              <span className="badge badge-secondary" key={item.id}>{item.name}</span>
            ))}
          </div>
          <QuoteTools quoteId={data.id} global={data.global} user={data.user.username} removeHandler={removeHandler} />
        </div>
        <div className="quote text-center mb-3">&bdquo;{data.quote}&ldquo;</div>
        <div className="author float-right">{data.author.firstname} {data.author.surname} [{data.author.country}]</div>
        <div className="clearfix float-left">
          <div className="user"><span>Vložil:</span> {data.user.firstname + " " + data.user.surname}</div>
          <div className="rating">
          {
            rated === true ? (
              <React.Fragment>
                <StarRatings
                  rating={ rating }
                  starRatedColor="#ffc845"
                  starEmptyColor="#ccc"
                  numberOfStars={10}
                  starDimension="20px"
                  starSpacing="0px"
                  name={data.id.toString()}
                />
                <span className="d-block text-center"> Již jste hlasoval ({userscore})!</span>
              </React.Fragment>
            ) : (
                <StarRatings
                  rating={ rating }
                  starRatedColor="#ffc845"
                  starEmptyColor="#ccc"
                  starHoverColor="#ffc845"
                  numberOfStars={10}
                  changeRating={(rat, id) => {
                    setRating(rat);
                    ratingHandler(rat, id);
                    setRated(true);
                    setUserScore(rat)}
                  }
                  starDimension="20px"
                  starSpacing="0px"
                  name={data.id.toString()}
                />
            )
          }
          </div>
        </div>
      </div>
    )
}

export default Quote;