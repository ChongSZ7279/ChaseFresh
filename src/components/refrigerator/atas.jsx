import React, {useState} from 'react'
import './atas.css'

const Refrigerator = () => {
  const [frontMiddleOpen, setFrontMiddleOpen] = useState(false);
  const [frontBottomOpen, setFrontBottomOpen] = useState(false);
  const [littleFrontClosed, setLittleFrontClosed] = useState(false);

  const handleFrontMiddleClick = () => {
    setFrontMiddleOpen(!frontMiddleOpen);
  };

  const handleInsideMiddleClick = () => {
    setFrontMiddleOpen(false);
  };

  const handleFrontBottomClick = () => {
    setFrontBottomOpen(!frontBottomOpen);
  };

  const handleInsideBottomClick = () => {
    setFrontBottomOpen(false);

    if (!frontBottomOpen && littleFrontClosed) {
      setLittleFrontClosed(false);
    }
  };

  const handleLittleFrontClick = () => {
    setLittleFrontClosed(!littleFrontClosed);

    if (littleFrontClosed) {
      // Your logic when little front is closed
    } else {
      // Your logic when little front is open
    }
  };


  return (
    <>
    <div class="notice">
        <div class="col">
            <h1>Sorry not responsive.<br /> Increase your screen size up to 680px</h1>
        </div>
    </div>
    <div class="main-wrapper">
        <span>Don't forget to open the bottom drawer!</span>
        {/* <div className={`cube ${frontMiddleOpen ? 'open' : ''}`}> */}
        <div className='cube'>
            {/* <div className={`front front-top ${frontMiddleOpen ? 'open' : 'close'}`} onClick={handleFrontMiddleClick}> */}
            <div className='front front-top'>
                <div class="lights lights-box"></div>
                <div class="lights"></div>
                <div class="lights green"></div>
                <div class="lights"></div>
                <div class="me">
            </div>
        </div>
        <div className={`front-inside front-inside-middle ${frontMiddleOpen ? 'open' : 'close'}`} onClick={handleFrontMiddleClick}>
            <div class="little-doorknob"></div>
        </div>
        <div class="divider"></div>
            <div className={`front front-bottom ${frontBottomOpen ? 'open' : 'close'}`} onClick={handleFrontBottomClick}>
                <div class="doorknob"></div>
            </div>
            <div class="front-inside front-inside-middle"></div>
            <div className={`front-inside front-inside-bottom ${frontBottomOpen ? 'open-inside' : 'close-inside'}`} onClick={handleInsideBottomClick}></div>
            <div class="top"></div>
            <div class="left"></div>
            <div class="right"></div>
            <div class="back back-front"></div>
            <div class="back back-inside"></div>
            {frontMiddleOpen || frontBottomOpen ? (
                <>
            <div class="shelf first">
                <div class="box-item-top purple"></div>
                <div class="box-item blue"></div>
                <div class="small-box blue"></div>
                <div class="small-box-top purple"></div>
                <div class="small-box green"></div>
                <div class="small-box-top blue-wood"></div>
            </div>
            <div class="shelf second">
                <div class="box-item-top purple"></div>
                <div class="box-item blue"></div>
                <div class="small-box green"></div>
                <div class="small-box-top blue-wood"></div>
            </div>
            <div class="shelf third">
                <div class="pot-handle"></div>
                <div class="pot-lid"></div>
                <div class="pot-side-handle side-handle-left"></div>
                <div class="pot-side-handle side-handle-right"></div>
                <div class="item pot"></div>
                <div class="box-item-top purple"></div>
                <div class="box-item blue"></div>
            </div>
            <div class="shelf forth">
                <div class="bottle milk"></div>
                <div class="bottle-pot"></div>
                <div class="box-item-top purple"></div>
                <div class="box-item blue"></div>
                <div class="pot-handle"></div>
                <div class="pot-lid"></div>
                <div class="pot-side-handle side-handle-left"></div>
                <div class="pot-side-handle side-handle-right"></div>
                <div class="item pot"></div>
            </div>
            <div class="shelf fifth">
                <div class="bottle milk"></div>
                <div class="bottle-pot"></div>
                <div class="bottle milk"></div>
                <div class="bottle-pot"></div>
                <div class="bottle milk"></div>
                <div class="bottle-pot"></div>
                <div class="bottle milk"></div>
                <div class="bottle-pot"></div>
            </div>
            <div class="shelf sixth">
                <div class="pot-handle"></div>
                <div class="pot-lid"></div>
                <div class="pot-side-handle side-handle-left"></div>
                <div class="pot-side-handle side-handle-right"></div>
                <div class="item pot"></div>
                <div class="box-item-top hoki"></div>
                <div class="box-item blue-wood"></div>
            </div>
            </>
          ) : null}
            <div class="little-wrapper">
                <div class="little-cube box">
                <div class="little-left"></div>
                <div class="little-back"></div>
                <div class="little-right"></div>
                <div class="little-bottom"></div>
                <div class="little-front closed"></div>
                </div>
            </div>
        </div>
        <div class="bottom"></div>
    </div>
    </>
  )
}

export default Refrigerator