import React from 'react';
import ActorPhoto from './ActorPhoto'


class Main extends React.Component {

  state = {
    answer: "",
    actor: null,
    correct: 0,
    incorrect: 0,
    total:0
    
  }

  componentDidMount() {
    this.fetchPhoto();
  }


  fetchPhoto = () => {
    let page = Math.ceil(Math.random() * 24)
    //let actorIndex = Math.floor(Math.random() * 19)
    let url = 'https://api.themoviedb.org/3/person/popular?api_key=a3c8a67818b95d395055b1c64330a5d4&language=en-US&page=' + page

    fetch ( url ) 
      .then((resp) => resp.json())
        .then((
          peopleObj 
        ) => this.showPhoto(peopleObj)
      )
  }

  showPhoto = (obj) => {
    console.log(obj)
    let actorIndex = Math.ceil(Math.random() * 19)
    let actor = obj.results[actorIndex]

    console.log(obj.results[actorIndex])
    

    if ( actor.known_for_department === "Acting" && actor.profile_path ) {
      this.setState({
        actor: actor
      })
      //return 'https://image.tmdb.org/t/p/original/' + obj[actorIndex].profile_path
    } else {
      this.showPhoto(obj)
    } 
  }

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  plainStr = (str) => {
    return str.normalize("NFD").replace(/\p{Diacritic}/gu, "").replace(/[^a-zA-Z ]/g, "").toLowerCase()
  }

  answerHandler = (e) => {
    e.preventDefault();
    let name = this.state.actor.name
    let answer = e.target[0].value
    console.log(this.plainStr(answer))
    if (this.plainStr(answer) === this.plainStr(name)) {
      this.setState(prevState => {
        return {correct: prevState.correct + 1}
      })
    } else {
      this.setState(prevState => {
        return {incorrect: prevState.incorrect + 1}
      })
    }
    this.setState(prevState => {
      return {total: prevState.total + 1}
    })
    this.setState({answer: ""})
    this.fetchPhoto()
  }



  render() {
    
    return (
      <>
      {this.state.actor ? <ActorPhoto actor={this.state.actor} /> : null}
        <div className="answer">
          <form onSubmit={this.answerHandler} >
            <input
              className="form-control"
              type="text"
              name="answer"
              placeholder="Name"
              value={this.state.answer}
              onChange={this.changeHandler}
            />
            <button type="submit">Submit</button>
          </form>
        </div>
        <div className='score'>
          <p>Correct: {this.state.correct}</p>
          <p>Incorrect: {this.state.incorrect}</p>

        </div>
      </>
    );
  }
}

export default Main