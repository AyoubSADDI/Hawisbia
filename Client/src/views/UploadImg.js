import React, { Component } from "react";

export default class UploadImg extends Component {
  state = {
    profileImg:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
  };
  imageHandler = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        this.setState({ profileImg: reader.result });
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  render() {
    const { profileImg } = this.state;
    return (
        <>
         <div className="img-holder">
            <img src={profileImg} alt="" id="img" className="img1" />
          </div>
          <input
            type="file"
            accept="image/*"
            name="image-upload"
            id="input1"
            onChange={this.imageHandler}
          />
          <div className="label1">
            <label className="image-upload" htmlFor="input1">
              Choose your Photo
            </label>
          </div>
        </>
         
    );
  }
}
