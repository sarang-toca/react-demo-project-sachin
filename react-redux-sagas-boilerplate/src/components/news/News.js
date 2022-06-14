import React from 'react';
import { connect } from 'react-redux';
import { getNews } from '../../redux/actions/action';
import PropTypes from 'prop-types';
const News = ({ getNews, article,}) => {
    return (
        <div>
            <button onClick={getNews}>Press to see news</button>
            {/* {article.map((item) => (
                <h1>one</h1>
            ))}; */}
            {console.log({ article })}
            {(article) ? (
                article.map((item) => (
                    <h1 key={item.title} />
                ))
            ) : (<h2>nothing</h2>)}
        </div>
    )
}

const mapDispatchToProps = {
    getNews: getNews,
};

const mapStateToProps = (state) => ({
    article: state.newsReducer.news,
});

News.propTypes = {
   
    getNews: PropTypes.func,
    article: PropTypes.func,
  }
export default connect(mapStateToProps, mapDispatchToProps)(News);