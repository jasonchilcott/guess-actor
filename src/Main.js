import React from 'react';


class Main extends React.Component {

  state = {
    photo: null
  }

  componentDidMount() {
    this.fetchPhoto();
  }


  fetchPhoto = () => {
    let page = Math.floor(Math.random() * 99)
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
    let actorIndex = Math.floor(Math.random() * 19)
    let actor = obj.results[actorIndex]
    console.log(obj.results[actorIndex])

    if ( actor.known_for_department === "Acting" && actor.profile_path ) {
      this.setState({
        photo: actor.profile_path
      })
      //return 'https://image.tmdb.org/t/p/original/' + obj[actorIndex].profile_path
    } else {
      this.showPhoto(obj)
    } 
  }

  render() {
    
    return (
      <>
      <img
              className="actor"
              src={'https://image.tmdb.org/t/p/original/' + this.state.photo}
              alt='actor'
      />
        
      </>
    );
  }
}

export default Main