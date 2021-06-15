import React, { useState, useRef, useEffect } from 'react';
import { Container, Row, Form, Input, Label, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux'
import { updateProfile, updateProfilePicture } from '../../../../redux/actions/auth'
import ModalDelete from "../../../../components/common/modal-delete";
import defaultImage from '../../../../public/assets/images/tiojewelers/default_profile.png'
import { useDropzone } from 'react-dropzone'
import AvatarEditor from 'react-avatar-editor'
import InputRange from "react-input-range";
import { dataURLtoFile } from '../../../../helpers/convertImage'
import { toast } from 'react-toastify';
import { useTranslation } from "react-i18next";
import i18next from "../../../../components/constant/i18n";
import language from "../../../../components/constant/langConfig.json";
import { useRouter } from 'next/router';

const ProfilePage = () => {
    const { t } = useTranslation();
    const { user } = useSelector(state => ({ user: state.auth.user }));
    const dispatch = useDispatch();
    const [confirm, setConfirm] = useState(false);
    const [sliderValue, onSliderChange] = useState(1);
    const cropedImage = useRef(null);
    const router = useRouter();


    const { login } = useSelector(state => ({
        login: state.auth.login,
    }))

    useEffect(() => {
        if (!login.isAuthenticated) {
            router.push('/page/account/login');
        }
    }, [])

    const [userData, setUserData] = useState({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        company: user.company || '',
        address1: user.address1 || '',
        address2: user.address2 || '',
        city: user.city || '',
        province: user.province || '',
        provinceCode: user.provinceCode || '',
        country: user.country || '',
        countryCode: user.countryCode || '',
        zip: user.zip || '',
        phone: user.phone || '',
        photo: user.photo || '',
        language: user.language || 'en',
    });

    const handleChange = (event) => {
        setUserData({
            ...userData,
            [event.target.name]: event.target.value,
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(
            updateProfile(user, userData, (response) => {
                if (!response.prompt) {
                    i18next.changeLanguage(userData.language);
                    toast.success(t('User changed successfully'));
                } else {
                    toast.error(t(`${response.prompt}`));
                }
            })
        );
    }

    const onConfirm = () => {
        setConfirm(true);
    }

    const [file, setFile] = useState({ preview: user.photo })

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: 'image/*',
        onDrop: acceptedFiles => {
            setFile(
                acceptedFiles.map(file =>
                    Object.assign(file, {
                        preview: URL.createObjectURL(file)
                    })
                )
            )
        }
    })

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const onCrop = () => {
        if (cropedImage != null) {
            const url = cropedImage.current.getImageScaledToCanvas().toDataURL();
            var profileImg = dataURLtoFile(url, 'profile.jpg');

            Object.assign(profileImg, {
                preview: URL.createObjectURL(profileImg)
            })

            const data = new FormData()
            data.append('photo', profileImg)
            upload(data, profileImg)
        }

    }
    const upload = async (data, profileImg) => {
        dispatch(
            updateProfilePicture(data, profileImg.preview, (response) => {
                if (!response.prompt) {
                    toggle();
                    toast.success(t('User changed successfully'));
                } else {
                    toast.error(t(`${response.prompt}`));
                }
            })
        );
    }


    return (
        <>
            {
                confirm && <ModalDelete setConfirm={setConfirm} />
            }
            <section className="contact-page register-page">
                <Container>
                    <Row>
                        <Col sm="12">
                            <h3>PERSONAL DETAIL</h3>
                            <Row className="mb-4 ml-4">
                                <img
                                    src={user.photo || defaultImage}
                                    alt="media"
                                    className="rounded-circle mb-2"
                                    style={{ height: 100, width: 100, cursor: 'pointer' }}
                                    onClick={toggle}
                                />
                            </Row>
                            <Form className="theme-form mb-5" onSubmit={handleSubmit}>
                                <Row>
                                    <Col md="6">
                                        <Label htmlFor="firstName">First Name</Label>
                                        <Input type="text" name="firstName" onChange={handleChange} value={userData.firstName} className="form-control" id="firstName" placeholder="Enter Your First Name"
                                            required="" />
                                    </Col>
                                    <Col md="6">
                                        <Label htmlFor="lastName">Last Name</Label>
                                        <Input type="text" name="lastName" onChange={handleChange} value={userData.lastName} className="form-control" id="last-name" placeholder="Enter Your Last Name" required="" />
                                    </Col>
                                    <Col md="6">
                                        <Label htmlFor="email">Email</Label>
                                        <Input type="text" name="email" onChange={handleChange} value={userData.email} className="form-control" id="email" placeholder="Enter Your Email" required="" />
                                    </Col>
                                    <Col md="6">
                                        <Label htmlFor="company">Company</Label>
                                        <Input type="text" name="company" onChange={handleChange} value={userData.company} className="form-control" id="company" placeholder="Enter your Company"
                                            required="" />
                                    </Col>
                                    <Col md="6">
                                        <Label htmlFor="address1">Address 1</Label>
                                        <Input type="text" name="address1" onChange={handleChange} value={userData.address1} className="form-control" id="address1" placeholder="Enter Your Address 1"
                                            required="" />
                                    </Col>
                                    <Col md="6">
                                        <Label htmlFor="address2">Address 2</Label>
                                        <Input type="text" name="address2" onChange={handleChange} value={userData.address2} className="form-control" id="address2" placeholder="Enter Your Address 2"
                                            required="" />
                                    </Col>
                                    <Col md="6">
                                        <Label htmlFor="city">City</Label>
                                        <Input type="text" name="city" onChange={handleChange} value={userData.city} className="form-control" id="city" placeholder="Enter Your City" required="" />
                                    </Col>
                                    <Col md="6">
                                        <Label htmlFor="province">Province</Label>
                                        <Input type="text" name="province" onChange={handleChange} value={userData.province} className="form-control" id="province" placeholder="Enter your Province"
                                            required="" />
                                    </Col>
                                    <Col md="6">
                                        <Label htmlFor="provinceCode">Province Code</Label>
                                        <Input type="text" name="provinceCode" onChange={handleChange} value={userData.provinceCode} className="form-control" id="provinceCode" placeholder="Enter Your Province Code" required="" />
                                    </Col>
                                    <Col md="6">
                                        <Label htmlFor="country">Country</Label>
                                        <Input type="text" name="country" onChange={handleChange} value={userData.country} className="form-control" id="country" placeholder="Enter Your Country" required="" />
                                    </Col>
                                    <Col md="6">
                                        <Label htmlFor="countryCode">Country Code</Label>
                                        <Input type="text" name="countryCode" onChange={handleChange} value={userData.countryCode} className="form-control" id="countryCode" placeholder="Enter Your Country Code" required="" />
                                    </Col>
                                    <Col md="6">
                                        <Label htmlFor="zip">Zip</Label>
                                        <Input type="text" name="zip" onChange={handleChange} value={userData.zip} className="form-control" id="zip" placeholder="Enter Your ZIP" required="" />
                                    </Col>
                                    <Col md="6">
                                        <Label htmlFor="phone">Phone</Label>
                                        <Input type="text" name="phone" onChange={handleChange} value={userData.phone} className="form-control" id="phone" placeholder="Enter Your Phone" required="" />
                                    </Col>
                                    <Col md="6">
                                        <Label htmlFor="language">Language</Label>
                                        <select value={userData.language} onChange={handleChange} className="form-control w-50" id="language" name="language" size="1">
                                            {
                                                language.map((item, index) => (
                                                    <option key={index} value={item.val}>{item.lang}</option>
                                                ))
                                            }
                                        </select>
                                    </Col>
                                    <div className="col-md-12 d-flex justify-content-start">
                                        <button className="btn btn-sm btn-solid mr-4" type="submit">Save setting</button>
                                        <a onClick={onConfirm} className="btn btn-lg btn-danger">Delete Account</a>
                                    </div>
                                </Row>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </section>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Edit Profile Picture</ModalHeader>
                <ModalBody className="d-flex justify-content-center">
                    {
                        file[0]
                            ? <div>
                                <div>
                                    <AvatarEditor image={file[0]?.preview} borderRadius={9999} scale={sliderValue} ref={cropedImage} />
                                </div>
                                <div>
                                    <label htmlFor="zoom">Zoom:</label>

                                    <InputRange
                                        id="zoom"
                                        step={0.01}
                                        maxValue={2}
                                        minValue={1}
                                        value={sliderValue}
                                        onChange={onSliderChange}
                                        onChangeComplete={onSliderChange}
                                    />
                                </div>
                            </div>
                            : <div {...getRootProps()}>
                                <input {...getInputProps()} multiple={false} />
                                <div
                                    className={`${isDragActive ? 'bg-grey-100 dark:bg-grey-800' : 'bg-grey-50 dark:bg-grey-700'
                                        } border-dashed border-4 border-grey-200 dark:border-grey-600 p-8 h-32 w-full flex items-center justify-center`}>
                                    <div className="font-bold text-base d-flex align-items-center" style={{ height: 100, fontSize: 20 }}>
                                        Drag and drop some files here, or click to select files
                                        </div>
                                </div>
                            </div>
                    }
                </ModalBody>
                <ModalFooter>
                {
                    file[0] &&
                    <Button className="btn btn-sm btn-solid" onClick={onCrop}>Upload</Button>
                }
                    <Button className="btn btn-sm btn-outline" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default ProfilePage;