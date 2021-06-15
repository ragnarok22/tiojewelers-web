import React, { useState, useEffect } from "react";
/* import { Link } from '@reach/router' */
import Link from "next/link";
import { MENUITEMS } from "../../constant/menu";
import { Container, Row } from "reactstrap";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import axios from "axios";

const NavBar = () => {
  const [menulista, setMenulista] = useState([])
  const { t } = useTranslation();
  const [navClose, setNavClose] = useState({ right: "0px" });
  const router = useRouter();

  const lstType = async (cant) => {
    try {
      const { status, data } = await axios.get("/product/types", { "quantity": cant }, {
        validateStatus: (status) => {
          return status >= 200 && status < 500;
        }
      });
      //console.log("data", data);
      if (status >= 200) {
        const lst = [{
          title: 'products', type: 'sub', children: [
            {
              path: '/shop/left_sidebar', title: 'list_products', type: 'link'
            }],
        }]
        data.map((item, index) => {
          if (index < 5) {
            lst.push({
              title: item.name,
              type: 'sub',
              children: [
                { path: `/shop/left_sidebar?vendor=&tags=&productType=${item.id}&minPrice=&maxPrice=`, title: item.name, type: 'link', type: 'link' }]
            }
            )
          }
        })
        setMenulista(lst)
        console.log(lst);
        /* if (cant > data.length) {
          for (let i = 0; i < data.length; i++) {
            lst.push(
              {
                title: data[i].name,
                type: 'sub',
                children: [
                  { path: `/shop/left_sidebar?vendor=&tags=&productType=${data.id}&minPrice=&maxPrice=`, title: data[i].name, type: 'link', type: 'link' }]
              }
            )
          }
        } else {
          for (let i = 0; i < cant; i++) {
            lst.push(
              {
                title: data[i].name,
                type: 'sub',
                children: [
                  { path: '/', title: data[i].name, type: 'link', type: 'link' }]
              }
            )
          }
          setMenulista(lst)
        } */

      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (window.innerWidth < 750) {
      setNavClose({ right: "-410px" });
    }
    if (window.innerWidth < 1199) {
      setNavClose({ right: "-300px" });
    }
  }, []);

  const openNav = () => {
    setNavClose({ right: "0px" });
    if (router.asPath == "/layouts/Gym")
      document.querySelector("#topHeader").classList.add("zindex-class");
  };

  const closeNav = () => {
    setNavClose({ right: "-410px" });
    if (router.asPath == "/layouts/Gym")
      document.querySelector("#topHeader").classList.remove("zindex-class");
  };
  // eslint-disable-next-line

  const handleMegaSubmenu = (event) => {
    if (event.target.classList.contains("sub-arrow")) return;

    if (
      event.target.parentNode.nextElementSibling.classList.contains(
        "opensubmegamenu"
      )
    )
      event.target.parentNode.nextElementSibling.classList.remove(
        "opensubmegamenu"
      );
    else {
      document.querySelectorAll(".menu-content").forEach(function (value) {
        value.classList.remove("opensubmegamenu");
      });
      event.target.parentNode.nextElementSibling.classList.add(
        "opensubmegamenu"
      );
    }
  };

  const [mainmenu, setMainMenu] = useState(MENUITEMS);

  useEffect(() => {
    lstType(5)
    console.log("lISTA DE MENU", menulista);
    const currentUrl = location.pathname;
    menulista.filter((items) => {
      if (items.path === currentUrl) setNavActive(items);
      if (!items.children) return false;
      items.children.filter((subItems) => {
        if (subItems.path === currentUrl) setNavActive(subItems);
        if (!subItems.children) return false;
        subItems.children.filter((subSubItems) => {
          if (subSubItems.path === currentUrl) setNavActive(subSubItems);
        });
      });
    });
  }, []);

  const setNavActive = (item) => {
    menulista.filter((menuItem) => {
      if (menuItem != item) menuItem.active = false;
      if (menuItem.children && menuItem.children.includes(item))
        menuItem.active = true;
      if (menuItem.children) {
        menuItem.children.filter((submenuItems) => {
          if (submenuItems.children && submenuItems.children.includes(item)) {
            menuItem.active = true;
            submenuItems.active = false;
          }
        });
      }
    });

    setMainMenu({ mainmenu: MENUITEMS });
  };

  // Click Toggle menu
  const toggletNavActive = (item) => {
    if (!item.active) {
      menulista.forEach((a) => {
        if (menulista.includes(item)) a.active = false;
        if (!a.children) return false;
        a.children.forEach((b) => {
          if (a.children.includes(item)) {
            b.active = false;
          }
          if (!b.children) return false;
          b.children.forEach((c) => {
            if (b.children.includes(item)) {
              c.active = false;
            }
          });
        });
      });
    }
    item.active = !item.active;
    setMainMenu({ mainmenu: MENUITEMS });
  };

  const openMblNav = (event) => {
    if (event.target.classList.contains("sub-arrow")) return;

    if (event.target.nextElementSibling.classList.contains("opensubmenu"))
      event.target.nextElementSibling.classList.remove("opensubmenu");
    else {
      document.querySelectorAll(".nav-submenu").forEach(function (value) {
        value.classList.remove("opensubmenu");
      });
      /*  document
         .querySelector(".mega-menu-container")
         .classList.remove("opensubmenu");
       event.target.nextElementSibling.classList.add("opensubmenu"); */
    }
  };

  return (
    <div>
      <div className="main-navbar">
        <div id="mainnav">
          <div className="toggle-nav" onClick={openNav.bind(this)}>
            <i className="fa fa-bars sidebar-bar"></i>
          </div>
          <ul className="nav-menu" style={navClose}>
            <li className="back-btn" onClick={closeNav.bind(this)}>
              <div className="mobile-back text-right">
                <span>Back navbar</span>
                <i className="fa fa-angle-right pl-2" aria-hidden="true"></i>
              </div>
            </li>
            <li>
              <Link href="/">
                <a className="nav-link">
                  {t('home')}
                </a>
              </Link>
            </li>
            {menulista.map((menuItem, i) => {
              return (
                <li
                  key={i}
                  className={` ${menuItem.megaMenu ? "mega-menu w-50%" : ""} `}
                >
                  <a className="nav-link" onClick={(e) => openMblNav(e)}>
                    {" "}
                    {t(menuItem.title)}
                    <span className="sub-arrow"></span>
                  </a>
                  {menuItem.children && !menuItem.megaMenu ? (
                    <ul className="nav-submenu">
                      {menuItem.children.map((childrenItem, index) => {
                        return (
                          <li
                            key={index}
                            className={`${childrenItem.children ? "sub-menu " : ""
                              }`}
                          >
                            {childrenItem.type === "sub" ? (
                              <a
                                href={null}
                                onClick={() => toggletNavActive(childrenItem)}
                              >
                                {t(childrenItem.title)}
                                {childrenItem.tag === "new" ? (
                                  <span className="new-tag">new</span>
                                ) : (
                                  ""
                                )}
                                <i className="fa fa-angle-right pl-2"></i>
                              </a>
                            ) : (
                              ""
                            )}
                            {childrenItem.type === "link" ? (
                              /*  <Link href={`${childrenItem.path}`}> */
                              <a href={`${childrenItem.path}`}>
                                {t(childrenItem.title)}
                                {childrenItem.tag === "new" ? (
                                  <span className="new-tag">new</span>
                                ) : (
                                  ""
                                )}
                              </a>
                              /*  </Link> */
                            ) : (
                              ""
                            )}
                            {childrenItem.children ? (
                              <ul
                                className={`nav-sub-childmenu ${childrenItem.active ? "menu-open " : "active"
                                  }`}
                              >
                                {childrenItem.children.map(
                                  (childrenSubItem, key) => (
                                    <li key={key}>
                                      {childrenSubItem.type === "link" ? (
                                        <Link href={childrenSubItem.path}>
                                          <a className="sub-menu-title">
                                            {t(childrenItem.title)}
                                            {childrenSubItem.tag === "new" ? (
                                              <span className="new-tag">
                                                new
                                              </span>
                                            ) : (
                                              ""
                                            )}
                                          </a>
                                        </Link>
                                      ) : (
                                        ""
                                      )}
                                    </li>
                                  )
                                )}
                              </ul>
                            ) : (
                              ""
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <div
                      className={`mega-menu-container ${menuItem.megaMenu ? "" : "opensubmenu"
                        }`}
                    >
                      {menuItem.megaMenu === true ? (
                        <Container>
                          <Row>
                            {menuItem.children.map((megaMenuItem, i) => {
                              return (
                                <div
                                  className={`${menuItem.megaMenuType == "small"
                                    ? "col mega-box"
                                    : menuItem.megaMenuType == "medium"
                                      ? "col-lg-3"
                                      : menuItem.megaMenuType == "large"
                                        ? "col"
                                        : ""
                                    } `}
                                  key={i}
                                >
                                  <div className="link-section">
                                    <div className="menu-title">
                                      <h5 onClick={(e) => handleMegaSubmenu(e)}>
                                        {t(megaMenuItem.title)}
                                      </h5>
                                    </div>
                                    <div className="menu-content">
                                      <ul>
                                        {menuItem.title === "Elements"
                                          ? megaMenuItem.children.map(
                                            (subMegaMenuItem, i) => {
                                              return (
                                                <li key={i}>
                                                  <a
                                                    href={
                                                      subMegaMenuItem.path
                                                    }
                                                  >
                                                    <i
                                                      className={`icon-${subMegaMenuItem.icon}`}
                                                    ></i>
                                                    {t(subMegaMenuItem.title)}
                                                  </a>
                                                </li>
                                              );
                                            }
                                          )
                                          : megaMenuItem.children.map(
                                            (subMegaMenuItem, i) => {
                                              return (
                                                <li key={i}>
                                                  <a
                                                    href={
                                                      subMegaMenuItem.path
                                                    }
                                                  >
                                                    {t(subMegaMenuItem.title)}
                                                  </a>
                                                </li>
                                              );
                                            }
                                          )}
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </Row>
                        </Container>
                      ) : (
                        ""
                      )}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
