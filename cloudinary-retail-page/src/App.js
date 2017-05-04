import React, { Component } from 'react';
import {Image, CloudinaryContext, Transformation} from 'cloudinary-react';

//using cloudinary to select an image and adjust it's rgb value
const ImageTransformations = ({width, selectedShirt}) => {
    return (
        <Image publicId={selectedShirt.main+'.jpg'}>
            <Transformation width={width} crop="scale" />
            <Transformation effect="red:255" />
            <Transformation effect="blue:255" />
            <Transformation effect="green:255" />
            <Transformation underlay={selectedShirt.underlay}  flags="relative" width="1.0" />
            <Transformation overlay={selectedShirt.overlay}  flags="relative" width="1.0"  />
        </Image>
    );
};

class App extends Component {

    constructor(props) {
        super(props);
        const defaultShirt = {id: 1, main: 'shirt_only'};
        this.state = {
            shirts: [
                defaultShirt,
                {id: 2, main: 'laying-shirt'},
                {id: 3, main: 'hanging_t-shirt'}
            ],
            selectedShirt: defaultShirt,
        };
    }

    selectShirt(thumb) {
        this.setState({selectedShirt: thumb}, _ => this.forceUpdate())
    }

    render() {

        return (
          <div className="App">
              <CloudinaryContext cloudName="<YOUR_CLOUD_NAME>">
                  <div id="imageDemoContainer">
                      <div id="mainImage">
                          <ImageTransformations
                              width="600"
                              rgb={rgb}
                              selectedShirt={this.state.selectedShirt}
                              text={this.state.text} />
                      </div>
                      <div id="imageThumbs">
                          <ul id="thumbs">
                              {this.state.shirts.map(thumb => {
                                 return (
                                 <li className={thumb.main === this.state.selectedShirt.main ? 'active': ''} onClick={this.selectShirt.bind(this, thumb)} key={thumb.id}>
                                     {/*<Image publicId={thumb.main}>*/}
                                         {/*<Transformation width="75" crop="scale" />*/}
                                     {/*</Image>*/}
                                     <ImageTransformations
                                         width="75"
                                         rgb={rgb}
                                         selectedShirt={thumb}
                                         text={' '} />
                                 </li>
                                 )
                              })}
                          </ul>
                      </div>
                  </div>
              </CloudinaryContext>
          </div>
        );
    }
}

export default App;
