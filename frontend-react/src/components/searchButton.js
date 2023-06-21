import React, { useState, useEffect } from "react";
import useActiveTheme from "../hooks/useActiveTheme";
import useAuth from "../hooks/useAuth";

//Images
import searchDark from "../icons/search_dark.svg";
import searchLight from "../icons/search_light.svg";
import upDark from "../icons/up_dark.svg";
import upLight from "../icons/up_light.svg";
import downDark from "../icons/down_dark.svg";
import downLight from "../icons/down_light.svg";
import filterDark from "../icons/filter_dark.svg";
import filterLight from "../icons/filter_light.svg";
import filterHiddenDark from "../icons/filterhidden_dark.svg"
import filterHiddenLight from "../icons/filterhidden_light.svg"
import xDark from "../icons/x_dark.svg";
import xLight from "../icons/x_light.svg";
import xCircleDark from "../icons/xcircle_dark.svg"
import xCircleLight from "../icons/xcircle_light.svg"

function SearchButton({ messageHistory }) {
  const { isLight } = useActiveTheme();
  const { auth } = useAuth();

  const [searchString, setSearchString] = useState("");
  const [searchbarVisible, setSearchbarVisible] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);
  const [filter, setFilter] = useState({
    includeNames: true,
    includeText: true
  });

  const [resultFocus, setResultFocus] = useState(0);
  const [results, setResults] = useState([]);

  // useState-Setter
  const updateSearchString = (e) => {
    setSearchString(e.target.value);
  };
  const toggleFilterVisible = () => {
    setFilterVisible(!filterVisible);
  };
  const toggleSearchbarVisible = (bool) => {
    setSearchbarVisible(bool);
  };
  const updateFilter = (Obj) => {
    const tmpObj = { ...filter, ...Obj };

    setFilter(tmpObj);
  };
  const updateResults = (arr) => {
    setResults(arr);
  };
  const updateFocusResult = (num) => {
    setResultFocus(num);
  };

  useEffect(() => {
    getSearchResults(searchString);
  }, [searchString, filter]);

  const getSearchResults = (text) => {
    //calculate ResultArr
    const tmpResults = messageHistory.filter((msg) => {
        if (filter.includeText && msg.text?.includes(text)) {
            return true;
        }
        if (filter.includeNames && msg.usernickname?.includes(text)) {
            return true;
        }
        });

    //only keep Focus if nothing changes
    removeAllFocusStyling();
    

    //check if results are either all or 0 messages
    if (
        tmpResults.length == messageHistory.length || !tmpResults.length) {
        
        //set Results to none
            updateResults([]);
            return;
      }

    //highlight first result
    findFirstResult(tmpResults);

    updateResults([...tmpResults]);
  };

  //Result-Handling

  const findFirstResult = (resultArr) => {
    if (!resultArr.length) return;

    const nextID = resultArr[0].id;

    //scroll and apply
    applyFocusStyling(nextID);
    //workaround found online to fix input onChange not working
    setTimeout(() => {
      if (resultArr.length != messageHistory.length) scrollToResult(nextID);
    }, 50);

    //update State
    updateFocusResult(0);
  };

  const shiftFocusByDirection = (direction, resultArr) => {
    if (!resultArr.length) return;

    //remove old Focus
    const oldID = resultArr[resultFocus].id;
    removeFocusStyling(oldID);

    //get next Focus
    const nextFocus =
      (resultArr.length + (resultFocus + direction)) % resultArr.length; //modulo to jump back to beginning
    const nextID = resultArr[nextFocus].id;

    //scroll and apply
    scrollToResult(nextID);
    applyFocusStyling(nextID);

    //update State
    updateFocusResult(nextFocus);
  };

  const scrollToResult = (id) => {
    const resultHTML = document.getElementById(`msg${id}`);
    resultHTML.scrollIntoView({ behavior: "smooth" , block: "center"});
  };

  const applyFocusStyling = (id) => {
    const resultHTML = document.getElementById(`msg${id}`);
    resultHTML.classList.add("searchFocus");
  };

  const removeFocusStyling = (id) => {
    const resultHTML = document.getElementById(`msg${id}`);
    resultHTML.classList.remove("searchFocus");
  };

  const removeAllFocusStyling = () => {
    messageHistory.map((msg) => {
      const resultHTML = document.getElementById(`msg${msg.id}`);
      resultHTML.classList.remove("searchFocus");
    });
  };

  const toggleIncludeNames = () => {
    updateFilter({ includeNames: !filter.includeNames });
  };
  const toggleIncludeText = () => {
    updateFilter({ includeText: !filter.includeText });
  };


  return (
    <>
      {auth.token ? (
        <button
          onClick={() => toggleSearchbarVisible(!searchbarVisible)}
          className="titleButton"
        >
          <img alt="Search" src={isLight ? searchDark : searchLight} />
        </button>
      ) : (
        <></>
      )}

      {searchbarVisible ? (
        <div className="searchOverlay">
          <div className="searchWrapper">
            <div className="searchField">
              <button className="filterBtn" onClick={toggleFilterVisible}>
                <img alt="filter" src={isLight 
                                        ? 
                                        filterVisible ?  filterHiddenDark : filterDark
                                        :
                                        filterVisible ?  filterHiddenLight : filterLight
                                    } />
              </button>
              <input
                type="text"
                placeholder="Search"
                onChange={updateSearchString}
              ></input>
              <button
                disabled={
                  !results.length || results.length == messageHistory.length
                }
                className="prevResultBtn"
                onClick={() => {
                  shiftFocusByDirection(-1, results);
                }}
              >
                <img alt="previous" src={isLight ? upDark : upLight} />
              </button>
              <button
                disabled={
                  !results.length || results.length == messageHistory.length
                }
                className="nextResultBtn"
                onClick={() => {
                  shiftFocusByDirection(1, results);
                }}
              >
                <img alt="next" src={isLight ? downDark : downLight} />
              </button>
              <button
                className="nextResultBtn"
                onClick={() => {
                  toggleSearchbarVisible(!searchbarVisible);
                  removeAllFocusStyling();
                }}
              >
                <img alt="close" src={isLight ? xDark : xLight} />
              </button>

            </div>
              {filterVisible ? (
                <div className="filterField">
                  <label>Filter: </label>
                  <input
                    id="nameFilter"
                    className="nameFilter"
                    type="checkbox"
                    checked={filter.includeNames}
                    onChange={toggleIncludeNames}
                  ></input>
                  <label for="nameFilter">Usernames</label>

                  <input
                    id="textFilter"
                    className="textFilter"
                    type="checkbox"
                    checked={filter.includeText}
                    onChange={toggleIncludeText}
                  ></input>
                  <label for="textFilter">Messages</label>
                </div>
              ) : (
                <></>
              )}
          </div>
        </div>
      ) : (
        <> 
        </>
      )}
      
    </>
  );
}

export default SearchButton;

/*
{results.length ? <img alt="No Results" src={isLight ? xCircleDark : xCircleLight} /> : <></>}
*/