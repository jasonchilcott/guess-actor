import React from 'react';

  const ActorPhoto = (props) => {

    return (
    <img
    className="actor-photo"
    src={'https://image.tmdb.org/t/p/original/' + props.actor.profile_path}
    alt='actor'
    />)

  }

export default ActorPhoto