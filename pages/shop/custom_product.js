import React, { useContext, useEffect, useState } from 'react';
import CommonLayout from '../../components/shop/common-layout';
import { Media, Container, Row, Col, Label, Button } from 'reactstrap';
import InputRange from "react-input-range";
import CartContext from "../../helpers/cart";
import { getCustom as getCustomApi } from '../../config/api/products';

const Metro = () => {
    const cartCtx = useContext(CartContext);
    const addToCart = cartCtx.addToCart;
    const [goldKarat, setGoldKarat] = useState([]);
    const [goldColor, setGoldColor] = useState([]);
    const [width, setWidth] = useState({});
    const [length, setLength] = useState({});
    const [weight, setWeight] = useState(0);
    const [price, setPrice] = useState(0);
    const [chainName, setChainName] = useState();
    const [custom, setCustom] = useState([]);
    const [selectedGlobal, setSelectedGlobal] = useState({});

    useEffect(() => {
        const getCustom = async () => {
            try {
                let { data } = await getCustomApi();
                setCustom(data);
                setChainName(data[0].name);
                setWidth({
                    widthMin: data[0].widthMin,
                    widthMax: data[0].widthMax,
                    value: data[0].widthMin,
                })
                setLength({
                    lengthMin: data[0].lengthMin,
                    lengthMax: data[0].lengthMax,
                    value: data[0].lengthMin,
                })
                setSelectedGlobal(prev => ({ ...prev, goldKarat: data[0].karat.split(',')[0] }))
                setSelectedGlobal(prev => ({ ...prev, goldColor: data[0].color.split(',')[0] }))
                setGoldKarat(data[0].karat.split(','));
                setGoldColor(data[0].color.split(','));
            } catch (error) {
                console.error(error);
            }
        }
        getCustom();
    }, []);

    const handleChange = (id) => {
        let [selected] = custom.filter((item) => item.id == id);
        setChainName(selected.name);
        setWidth({
            widthMin: selected.widthMin,
            widthMax: selected.widthMax,
            value: selected.widthMin,
        })
        setLength({
            lengthMin: selected.lengthMin,
            lengthMax: selected.lengthMax,
            value: selected.lengthMin,
        })
        setGoldKarat(selected.karat.split(','));
        setGoldColor(selected.color.split(','));
        setSelectedGlobal(prev => ({ ...prev, goldKarat: selected.karat.split(',')[0] }))
        setSelectedGlobal(prev => ({ ...prev, goldColor: selected.color.split(',')[0] }))
    }
    console.info(`Karat: ${selectedGlobal.goldKarat}, Color: ${selectedGlobal.goldColor}`)
    return (
        <CommonLayout title="Custom Product" parent="home" parentUrl="/">
            <section className="">
                <div className="collection-wrapper">
                    <Container>
                        <Row>
                            <Col className="collection-content">
                                <div className="page-main-content">
                                    <div className="top-banner-wrapper">
                                        <div className="top-banner-content small-section pb-0">
                                            {custom
                                                ? <>
                                                    <Row xs='12' className="mb-2 text-center">
                                                        <Col>
                                                            <h4>BUILD YOUR GOLD CHAIN</h4>
                                                        </Col>
                                                    </Row>
                                                    <Row sm='3' className="mb-2 d-md-flex justify-content-center">
                                                        {
                                                            custom?.map((item, index) => (
                                                                <Col key={index} xs={{ size: 6, offset: 3 }} md={{ size: 2, offset: 1 }} lg={{ size: 2, offset: 0 }}>
                                                                    <Media
                                                                        src={`/assets/images/tiojewelers/${item.name === 'Cuban' ? 'cuban-chain' : item.name === 'Franco' ? 'franco-chain' : 'rope-chain'}.png`}
                                                                        className="img-fluid blur-up mb-3"
                                                                        alt=""
                                                                        style={{ height: 100, width: 100, cursor: 'pointer' }}
                                                                    />
                                                                    <Button className="btn btn-solid mb-3" onClick={() => handleChange(item.id)} active={item.name === chainName}>{item.name}</Button>
                                                                </Col>
                                                            ))
                                                        }
                                                    </Row>
                                                    <Row className="mb-2">
                                                        <Col xs={{ size: 6, offset: 3 }} lg={{ size: 6, offset: 0 }} className="mb-3">
                                                            <Row className="text-center">
                                                                <Col xs='12'>
                                                                    <h4>Gold Karat</h4>
                                                                </Col>
                                                            </Row>
                                                            <Row className="text-center">
                                                                <Col xs="12" className=" d-flex justify-content-center nowrap">
                                                                    {
                                                                        goldKarat?.length > 0 && goldKarat.map((item, index) => (
                                                                            <Button key={index} className="btn btn-solid mr-4" onClick={() => setSelectedGlobal({ ...selectedGlobal, goldKarat: item })} active={item === selectedGlobal.goldKarat}>{item} k</Button>
                                                                        ))
                                                                    }
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                        <Col xs={{ size: 6, offset: 3 }} lg={{ size: 6, offset: 0 }}>
                                                            <Row className="text-center">
                                                                <Col xs='12'>
                                                                    <h4>Gold Color</h4>
                                                                </Col>
                                                            </Row>
                                                            <Row className="text-center d-lg-none">
                                                                <Col xs="12" className="d-flex justify-content-center nowrap">
                                                                    {/* Tamaño movil */}
                                                                    {
                                                                        goldColor?.length > 0 && goldColor.map((item, index) => (
                                                                            <img
                                                                                key={index}
                                                                                style={{ cursor: 'pointer', width: 100, height: 100, filter: `grayscale(${item === 'white' ? 1 : 0}) hue-rotate(${item === 'rose' ? 330 : 0}deg)` }}
                                                                                src={`/assets/images/tiojewelers/yellow-gold.png`}
                                                                                className="img-fluid blur-up lazyload mr-3"
                                                                                alt=""
                                                                                onClick={() => setSelectedGlobal({ ...selectedGlobal, goldColor: item })}
                                                                            />
                                                                        ))
                                                                    }
                                                                </Col>
                                                            </Row>
                                                            <Row className="text-center">
                                                                <Col xs="12" className="d-flex justify-content-center nowrap">
                                                                    {
                                                                        goldColor.length > 0 && goldColor.map((item, index) => (
                                                                            <Button key={index} className="btn btn-solid mr-4" onClick={() => setSelectedGlobal({ ...selectedGlobal, goldColor: item })} active={item === selectedGlobal.goldColor}>{item}</Button>
                                                                        ))
                                                                    }
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                    </Row>
                                                    <Row className="mb-4">
                                                        <Col xs={{ size: 6, offset: 3 }} md={{ size: 6, offset: 3 }} lg={{ size: 6, offset: 0 }} className="mb-3">
                                                            <Row className="text-center d-flex justify-content-center">
                                                                <Col xs={{ size: 6, offset: 3 }} md={{ size: 4, offset: 1 }} className="mb-4">
                                                                    <h3 className="collapse-block-title" style={{ fontWeight: 'bold' }}>Width</h3>
                                                                    <div className="collection-collapse-block-content">
                                                                        <div className="wrapper mt-3">
                                                                            <div className="range-slider">
                                                                                <div className="pb-4">
                                                                                    <InputRange
                                                                                        step={2}
                                                                                        maxValue={width?.widthMax}
                                                                                        minValue={width?.widthMin}
                                                                                        value={width?.value}
                                                                                        onChange={(widthL) => {
                                                                                            setWidth({ ...width, value: widthL });
                                                                                        }}
                                                                                        onChangeComplete={(widthL) => {
                                                                                            setWidth({ ...width, value: widthL });
                                                                                        }}
                                                                                    />
                                                                                </div>
                                                                                {`${width.value} mm`}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </Col>
                                                                <Col xs={{ size: 6, offset: 3 }} md={{ size: 4, offset: 0 }}>
                                                                    <div>
                                                                        <h3 className="collapse-block-title" style={{ fontWeight: 'bold' }}>Length</h3>
                                                                        <div className="collection-collapse-block-content">
                                                                            <div className="wrapper mt-3">
                                                                                <div className="range-slider">
                                                                                    <div className="pb-4">
                                                                                        <InputRange
                                                                                            step={2}
                                                                                            maxValue={length?.lengthMax}
                                                                                            minValue={length?.lengthMin}
                                                                                            value={length?.value}
                                                                                            onChange={(lengthL) => {
                                                                                                setLength({ ...length, value: lengthL });
                                                                                            }}
                                                                                            onChangeComplete={(lengthL) => {
                                                                                                setLength({ ...length, value: lengthL });
                                                                                            }}
                                                                                        />
                                                                                    </div>
                                                                                    {`${length.value} inches`}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                        <Col xs={{ size: 6, offset: 3 }} sm={{ size: 6, offset: 0 }} className="d-none d-lg-block">
                                                            <Row className="text-center">
                                                                <Col xs="12" className="d-flex justify-content-center nowrap">
                                                                    {/* Tamaño pantalla completa */}
                                                                    {
                                                                        goldColor?.length > 0 && goldColor.map((item, index) => (
                                                                            <img
                                                                                key={index}
                                                                                style={{ cursor: 'pointer', width: 100, height: 100, filter: `grayscale(${item === 'white' ? 1 : 0}) hue-rotate(${item === 'rose' ? 330 : 0}deg)` }}
                                                                                src={`/assets/images/tiojewelers/yellow-gold.png`}
                                                                                className="img-fluid blur-up lazyload ml-3 mr-5"
                                                                                alt=""
                                                                                onClick={() => setSelectedGlobal({ ...selectedGlobal, goldColor: item })}
                                                                            />
                                                                        ))
                                                                    }
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                    </Row>
                                                    <Row className="mb-4">
                                                        <Col xs={{ size: 6, offset: 3 }} md={{ size: 6, offset: 3 }} lg={{ size: 6, offset: 0 }} className="mb-4">
                                                            <Row className="text-center d-flex justify-content-center">

                                                                <img
                                                                    style={{ filter: `grayscale(${selectedGlobal.goldColor === 'white' ? 1 : 0}) hue-rotate(${selectedGlobal.goldColor === 'rose' ? 330 : 0}deg)` }}
                                                                    src={`/assets/images/tiojewelers/${chainName === 'Cuban' ? 'cuban-chain' : chainName === 'Franco' ? 'franco-chain' : 'rope-chain'}.png`}
                                                                    className="img-fluid blur-up lazyload mr-4"
                                                                    alt=""
                                                                />
                                                            </Row>
                                                        </Col>
                                                        <Col xs={{ size: 6, offset: 4 }} lg={{ size: 6, offset: 0 }}>
                                                            <Row className="text-center pb-3 pl-4 d-flex align-items-center">
                                                                <Media
                                                                    src={'/assets/images/tiojewelers/grams-ico.png'}
                                                                    alt=""
                                                                    className="pr-2"
                                                                />
                                                                <span style={{ fontSize: 25 }}>{Math.round((selectedGlobal.goldKarat / 24) * (length?.value * 2 + width.value * 4) * 100) / 100} g</span>
                                                            </Row>
                                                            <Row className="text-center d-flex align-items-center">
                                                                <Media
                                                                    src={'/assets/images/tiojewelers/price-ico.svg'}
                                                                    alt=""
                                                                    className="pr-2"
                                                                />
                                                                <span style={{ fontSize: 25 }}>{`$ ${150 * (selectedGlobal.goldKarat / 24) * (length?.value * 2 + width.value * 4)}`}</span>
                                                            </Row>
                                                        </Col>
                                                    </Row>
                                                    <Row className="d-flex justify-content-center mb-4" style={{ fontSize: 25 }}>
                                                        {`${length.value} inches, ${width.value} mm, ${selectedGlobal.goldKarat} k, ${selectedGlobal.goldColor} Gold, ${chainName}`}
                                                    </Row>
                                                    <Row className="d-flex justify-content-center mb-5">
                                                        <button
                                                            className="btn btn-solid"
                                                        //onClick={() => addToCart({ length, width, goldKarat: goldKarat.name, goldColor: goldColor.name, chainName: chainName.name }, 1)}
                                                        >
                                                            add to cart
                                                </button>
                                                    </Row>

                                                </>
                                                : <Row xs='12' className="mb-2 text-center">
                                                    <Col>
                                                        <h4>No materials to  build anything</h4>
                                                    </Col>
                                                </Row>
                                            }

                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </section>
        </CommonLayout>
    )
}

export default Metro;