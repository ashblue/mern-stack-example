import React from 'react';
import Moment from "react-moment";
import PropTypes from 'prop-types';

const ProfileExperience = (
  {
    experience: {
      company,
      title,
      to,
      from,
      description,
    },
  },
) => {
  function printToDate(date) {
    if (!date) return 'Now';
    return <Moment format='YYY/MM/DD'>{date}</Moment>;
  }

  return (
    <div>
      <h3 className="text-dark">{company}</h3>
      <p>
        <Moment format='YYYY/MM/DD'>{from}</Moment> - {printToDate(to)} <br/>
        <strong>Position:</strong> {title} <br/>
        <strong>Description:</strong> {description}
      </p>
    </div>
  );
};

ProfileExperience.propTypes = {
  experience: PropTypes.object.isRequired,
};

export default ProfileExperience;
