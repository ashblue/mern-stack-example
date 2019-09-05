import React from 'react';
import Moment from "react-moment";
import PropTypes from 'prop-types';

const ProfileEducation = (
  {
    education: {
      school,
      degree,
      fieldofstudy,
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
      <h3 className="text-dark">{school}</h3>
      <p>
        <Moment format='YYYY/MM/DD'>{from}</Moment> - {printToDate(to)} <br/>
        <strong>Degree:</strong> {degree} <br/>
        <strong>Field of Study:</strong> {fieldofstudy} <br/>
        <strong>Description:</strong> {description}
      </p>
    </div>
  );
};

ProfileEducation.propTypes = {
  education: PropTypes.object.isRequired,
};

export default ProfileEducation;
