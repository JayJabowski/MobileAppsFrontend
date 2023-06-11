import React, {useState, useEffect} from 'react';

function SearchButton({messageHistory}) {
    const [searchString, setSearchString ] = useState("");
    const [searchbarVisible, setSearchbarVisible] = useState(false);
    const [filterVisible, setFilterVisible] = useState(false);
    const [filter, setFilter] = useState({includeNames: true, includeText: true});
   
    const [resultFocus, setResultFocus] = useState(0);
    const [resultFocusDirection, setResultFocusDirection] = useState(1);
    const [results, setResults] = useState([]);

    // useState-Setter
    const updateSearchString = (str) => {
        setSearchString(str);
    }
    const toggleFilterVisible = () => {
        setFilterVisible(!filterVisible);
    }
    const toggleSearchbarVisible = () => {
        setSearchbarVisible(!searchbarVisible);
    }
    const updateFilter = (Obj) => {
        const tmpObj = {...filter, ...Obj};

        setFilter(tmpObj);
    } 
    const updateResults = (arr) => {
        setResults(arr);
    }
    const updateFocusResult = (num) => {
        setResultFocus(num);
    }
    const updateFocusResultDirection = (num) => {
        setResultFocusDirection(num);
    }

    const getSearchResults = (e) => {
        updateSearchString(e.target.value);
        const tmpResults = messageHistory.filter((msg) => {
            if(filter.includeText && msg.text?.includes(e.target.value)){
                return true;
            }
            if(filter.includeNames && msg.usernickname?.includes(e.target.value)){
                return true;
            }
        })

        //only keep Focus if nothing changes
        if(tmpResults.length == messageHistory.length || !tmpResults.length || tmpResults.length != results.length){
            removeAllFocusStyling();
        }

        //highlight first result
        findFirstResult(tmpResults);
        updateResults([...tmpResults]);
    }

    //Result-Handling

    /*
    const shiftResultBy = (num, resultArr) => {
        const tmpFocus = resultFocus !== null ? (resultFocus + num) % resultArr.length : 0;
        const prev = (resultArr.length + tmpFocus - num) % resultArr.length;

        const resultID = `msg${resultArr[tmpFocus].id}`;
        console.log(resultID);
        const prevID = `msg${resultArr[prev].id}`;
        console.log(prevID);
        
        const resultHTML = document.getElementById(resultID);
        const prevResultHTML = document.getElementById(prevID);
        
        scrollToResult(resultHTML);
        applyFocusStyling(resultHTML, prevResultHTML);

        updateFocusResult(tmpFocus);
    }
    */

    const findFirstResult = (resultArr) => {
        if(!resultArr.length) return;

        const nextID = resultArr[0].id;

        //scroll and apply
        applyFocusStyling(nextID);
        //workaround found online to fix input onChange not working
        setTimeout(() => {
            if(resultArr.length != messageHistory.length) scrollToResult(nextID);
        }
        , 50);

        //update State
        updateFocusResult(0);
    }

    const shiftFocusByDirection = (direction,resultArr) => {
        if(!resultArr.length) return;

        //remove old Focus
        const oldID = resultArr[resultFocus].id;
        removeFocusStyling(oldID);

        //get next Focus
        const nextFocus = ((resultArr.length) + (resultFocus + direction)) % resultArr.length; //modulo to jump back to beginning
        const nextID = resultArr[nextFocus].id;

        //scroll and apply
        scrollToResult(nextID);
        applyFocusStyling(nextID);

        //update State
        updateFocusResult(nextFocus);
    }

    const scrollToResult = (id) => {
        const resultHTML = document.getElementById(`msg${id}`);
        resultHTML.scrollIntoView({ behavior: "smooth"});
    }

    const applyFocusStyling = (id) => {
        const resultHTML = document.getElementById(`msg${id}`);
        resultHTML.classList.add("searchFocus");
    }

    const removeFocusStyling = (id) => {
        const resultHTML = document.getElementById(`msg${id}`);
        resultHTML.classList.remove("searchFocus");
    }

    const removeAllFocusStyling = () => {
        messageHistory.map((msg) => {
            const resultHTML = document.getElementById(`msg${msg.id}`);
            resultHTML.classList.remove("searchFocus")
        })
    }

    const toggleIncludeNames = () => {
        updateFilter({includeNames : !filter.includeNames})
    }
    const toggleIncludeText = () => {
        updateFilter({includeText : !filter.includeText})
    }

    return ( 
        <>
        <button onClick={toggleSearchbarVisible} className="searchButton">Search</button>
        
        {
            searchbarVisible
            ?
            <div className="searchField">
                <label>{`Showing search results for: ${searchString}`}</label>
                <input type="text" onChange={getSearchResults}></input>
                <button disabled={!results.length || results.length == messageHistory.length} 
                        className="prevResultBtn" 
                        onClick={() => {
                            shiftFocusByDirection(-1,results)
                        }}>
                                Prev
                            </button>
                <button disabled={!results.length || results.length == messageHistory.length} 
                        className="nextResultBtn" 
                        onClick={() => {
                            shiftFocusByDirection(1,results)
                            }}>
                                Next
                            </button>
                <button className="filterBtn" onClick={toggleFilterVisible}>Filter</button>
            </div>
            :
            <> </>
        }
        {
            filterVisible
            ?
            <div className="filterField">
                <label>Filter</label>

                <input id="nameFilter" 
                    className="nameFilter" 
                    type="checkbox" 
                    checked={filter.includeNames} 
                    onChange={() => {
                        toggleIncludeNames();
                        getSearchResults({ target : {value : searchString }});
                        }}></input>
                <label for="nameFilter">Search Usernames</label>

                <input id="textFilter" 
                    className="textFilter" 
                    type="checkbox"
                    checked={filter.includeText} 
                    onChange={()=> {
                        toggleIncludeText();
                        getSearchResults({ target : {value : searchString }});
                        }}></input>
                <label for="textFilter">Search Messages</label>
            </div>
            :
            <></>
        }
        </>
     );
}

export default SearchButton;