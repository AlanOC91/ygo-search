'use client';

import Image from 'next/image'
import {FaSearch, FaExternalLinkAlt} from 'react-icons/fa';
import {useState, useRef, useEffect} from 'react';
import { CSSTransition } from 'react-transition-group';
import SEO from './components/SEO';

export default function HomePage() {

    const [isLoading, setIsLoading] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [currentResultIndex, setCurrentResultIndex] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchSubmitted, setSearchSubmitted] = useState(false);
    const [showSearchResult, setShowSearchResult] = useState(false);
    const [cardInfo, setCardInfo] = useState({});
    const searchResultRef = useRef(null);
    const searchInputRef = useRef(null);
    const cardResultsDescriptionRef = useRef(null);

    function handleBlur() {
        const searchInputValue = searchInputRef.current.value.trim();
        if (searchInputValue === '') {
            setShowSearchResult(false);
        }
    }

    const handleSearchInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchFormSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        if (!searchTerm.trim()) {
            return; // Ignore API request if searchTerm is empty/blank
        }
        setSearchSubmitted(true);
        setShowSearchResult(true);

        const response = await fetch(`https://db.ygoprodeck.com/api/v8/card_search.php?fuzzy&num=5&offset=0&ename=${searchTerm}`);
        const data = await response.json();
        if (data['cards']) {
            setIsLoading(false);
            setSearchResults(data["cards"]); //Store search results in state
            setCurrentResultIndex(0); //Reset currentResultIndex to 0
            setCardInfo(data['cards'][0]);
        } else {
            setIsLoading(false);
            setSearchResults([]);
            setCardInfo({});
        }
    };

    function cardHit(result){
        if (result) {
            setCardInfo(result);
        }
    }

    const handleNextHitButtonClick = () => {
        setCurrentResultIndex((prevIndex) =>
            prevIndex === searchResults.length - 1 ? 0 : prevIndex + 1
        );
        const currentResult = searchResults[currentResultIndex];
        cardHit(currentResult);
    };

    // Left/Right arrow key navigation for search results
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.keyCode === 37) { // left arrow
                setCurrentResultIndex((prevIndex) =>
                    prevIndex === 0 ? searchResults.length - 1 : prevIndex - 1
                );
            } else if (event.keyCode === 39) { // right arrow
                setCurrentResultIndex((prevIndex) =>
                    prevIndex === searchResults.length - 1 ? 0 : prevIndex + 1
                );
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [currentResultIndex, searchResults]);

    // Update the cardInfo when currentResultIndex changes
    useEffect(() => {
        const currentResult = searchResults[currentResultIndex];
        cardHit(currentResult);
    }, [searchResults, currentResultIndex]);

    return (
        <div className="container">
            <SEO title="YGOSearch - Instant Yu-Gi-Oh! Card Search" description="An instant Yu-Gi-Oh! Card Search App from YGOPRODeck!" />
            <h1 className={`text-center`}>YGOSearch - Instant Yu-Gi-Oh! Card Fuzzy Searching</h1>
            <p className="low-margins"><a href="https://ygoprodeck.com/card-database/">Advanced Search</a></p>
            <form className="search-form" onSubmit={handleSearchFormSubmit}>
                <div className={`search-wrapper ${showSearchResult ? 'search-wrapper-expanded' : ''}`}>
                    <input type="text" id="search-card" placeholder="Yu-Gi-Oh! Card..." value={searchTerm} onChange={handleSearchInputChange} onBlur={handleBlur} ref={searchInputRef} />
                    <div className="search-icon">
                        <FaSearch />
                    </div>
                </div>
            </form>
            <CSSTransition in={showSearchResult} timeout={300} classNames="search-result" nodeRef={searchResultRef}>
                <div id={`search-area`} className={`search-result ${showSearchResult ? 'search-result-visible' : ''}`} ref={searchResultRef}>
                    {isLoading ? (
                        <div className="loader"></div>
                    ) : searchSubmitted && cardInfo.name ? (
                        <div className="card-info">
                            <div className="card-image-container">
                                <Image
                                    src={`https://images.ygoprodeck.com/images/cards/${cardInfo.id}.jpg`}
                                    alt={`${cardInfo.name}`}
                                    width={200}
                                    height={300}
                                    className="card-image"
                                />
                            </div>
                            <div className="card-details">
                                <h2>{cardInfo.name}</h2>
                                <div className="flex-items">
                                    <p>{cardInfo.race}</p>
                                    /
                                    <p>{cardInfo.type}</p>
                                    /
                                    {cardInfo.attribute && <p> {cardInfo.attribute}</p>}
                                </div>
                                <div className="flex-items">
                                    {cardInfo.atk !== null && <p>ATK/ {cardInfo.atk}</p>}
                                    {cardInfo.def !== null && <p>DEF/ {cardInfo.def}</p>}
                                    {cardInfo.linkval && <p>Link: {cardInfo.linkval}</p>}
                                    {cardInfo.linkval && <p>Link: {cardInfo.linkval}</p>}
                                    {cardInfo.level && <p>Level: {cardInfo.level}</p>}
                                    {cardInfo.scale && <p>Scale: {cardInfo.scale}</p>}
                                </div>
                                <p className="card-description" ref={cardResultsDescriptionRef}>{cardInfo.desc}</p>
                                <div className="next-prev-links">
                                    {searchResults.length > 1 && (
                                        <button className="next-hit" onClick={handleNextHitButtonClick}>Next Hit (??? / ???)</button>
                                    )}
                                </div>
                                <div className="card-links bottom-text">
                                    {cardInfo.id && cardInfo.konami_id && (
                                        <>
                                            <a href={`https://ygoprodeck.com/card/${cardInfo.pretty_url}`} target="_blank" rel="noopener noreferrer">
                                                YGOPRODeck
                                                <FaExternalLinkAlt className="external-link-icon" />
                                            </a>
                                            <a href={`https://www.db.yugioh-card.com/yugiohdb/card_search.action?ope=2&cid=${cardInfo.konami_id}`} target="_blank" rel="noopener noreferrer">
                                                Official Database
                                                <FaExternalLinkAlt className="external-link-icon" />
                                            </a>
                                            <a href={`https://yugipedia.com/wiki/${cardInfo.name}`} target="_blank" rel="noopener noreferrer">
                                                Yugipedia
                                                <FaExternalLinkAlt className="external-link-icon" />
                                            </a>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>


                    ): (
                        <p className="no-results">No results found.</p>
                    )}
                </div>
            </CSSTransition>
        </div>
    );
}