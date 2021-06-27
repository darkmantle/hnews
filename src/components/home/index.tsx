import React, { useEffect, useState } from 'react';
import Loader from "react-loader-spinner";
import './index.scss';

import baseline from "../../assets/baseline-web-24px.png";

import placeholder from "../../assets/Young-creative-business-people-meeting-at-office.-832112086_2125x1416.jpeg";

type Story = {
    by: string;
    descendants: number;
    id: number;
    kids: number[];
    score: number;
    time: number;
    title: string;
    type: string;
    url: string;
}

const Home = () => {

    const [stories, setStories] = useState<Story[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const nameInput = React.createRef<HTMLInputElement>();
    const textInput = React.createRef<HTMLTextAreaElement>();
    const commentForm = React.createRef<HTMLFormElement>();

    const [selectedStory, setSelected] = useState<number>();
    const [error, setError] = useState<boolean>(false);

    const getTopStories = async (count: number) => {
        const topStories = await fetch("https://hacker-news.firebaseio.com/v0/topstories.json");
        const json = await topStories.json();

        return json.slice(0, count);
    }

    const getStory = async (id: number) => {
        const story = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
        const json = await story.json();

        return json as Story;
    }

    useEffect(() => {
        if (loading) {
            (async () => {
                const storyIds = await getTopStories(9);
                const tempStories: Story[] = [];

                for (let i = 0; i < storyIds.length; i++) {
                    const story = await getStory(storyIds[i]);
                    tempStories.push(story);
                }

                setStories(tempStories);
                setLoading(false);
            })();
        }
    }, [loading]);

    const submitComment = (e: React.SyntheticEvent) => {
        // Check story selected
        if (selectedStory === undefined) {
            e.preventDefault();
            setError(true);
            return; 
        } else {
            setError(false);
        }

        // Check form validity using HTMl5
        if (commentForm.current?.checkValidity()) {
            e.preventDefault();

            //if (!selectedStory) alert("Error");
            const comment = {
                by: nameInput.current?.value,
                text: textInput.current?.value,
                time: Date.now(),
                parent: selectedStory,
                type: 'comment'
            };

            console.log(comment);
        }
    };

    const updateSelected = (id: number) => {
        if (id === selectedStory) setSelected(undefined);
        else setSelected(id);
        setError(false);
    }

    return (
        <div className="container-fluid" id="home-page" data-testid="home-page">
            <div className="container">
                <div className="row">
                    <div className="col headerText">
                        News
                    </div>
                </div>

                <div className="row justify-content-center">
                    {loading ?
                        <div className="col loader">
                            <Loader
                                type="ThreeDots"
                                color="#00BFFF"
                                height={100}
                                width={100}
                            />
                        </div>
                        :
                        stories.map((story, index) => (
                            <div className="col-12 col-md-4" key={index} onClick={() => updateSelected(story.id)}>
                                <div className={"card " + (story.id === selectedStory ? 'selected' : '')}>
                                    <img src={placeholder} className="card-img-top" alt="placeholder" />
                                    <div className="card-body">
                                        <h5 className="card-title">{story.title}</h5>
                                        <p className="card-text">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut non enim at ex pretium tempus. Pellentesque cursus purus cursus, volutpat urna eget, mattis turpis. Nunc et nulla rutrum, convallis magna id, lobortis nibh.
                                        </p>

                                        <div className="card-tags">
                                            <div className="card-tag">GAMING</div>
                                            <div className="card-tag">WOW</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>

            <div className="row findOutMore">
                <div className="col">
                    <div><img src={baseline} alt="baseline icon" /></div>
                    <div>Find out more at <a href="http://www.people.com" target="_blank" rel="noreferrer">www.people.com</a></div>
                </div>
            </div>



            <div className="container">
                <div className="row formRow">
                    <div className="col">
                        <h2>Leave a comment</h2>

                        <form ref={commentForm}>
                            <div className="mb3 col">
                                <input type="text" placeholder="Your name" className="form-control" id="by" ref={nameInput} required />
                            </div>
                            <div className="mb3">
                                <textarea className="form-control" id="text" rows={3} placeholder="Your comment" ref={textInput} required />
                            </div>
                            <div className={"error " + (error ? '' : 'hidden')}>You must select an article above</div>
                            <button type="submit" className="btn btn-primary" onClick={submitComment}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Home;