import { InstantSearch, SearchBox, Hits, Highlight, ClearRefinements, RefinementList, Configure, Pagination } from 'react-instantsearch-dom';
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch';
import "instantsearch.css/themes/algolia-min.css";
import Book from '../Component/Book';
import { useRecoilState } from 'recoil';
import publicConfigAtom from '../atoms/publicConfigAtom';
import { useEffect } from 'react';
import FullScreenLoading from '../Component/FullScreenLoading';
import { useState } from 'react';



const Hit = ({ hit }) => <Book key={hit.id} hit={hit} />;

export default function Books() {

    const [publicConfig, setPublicConfig] = useRecoilState(publicConfigAtom)

    const [searchClient, setSearchClient] = useState(null)
    useEffect(() => {
        console.log("reAssigningSearchClient");
        console.log(publicConfig);
        if (publicConfig) {
            setSearchClient(instantMeiliSearch(
                import.meta.env.VITE_MEILISEARCH_URL,
                publicConfig.search_api_key
            ));
        }

    }, [publicConfig])

    if (!searchClient) {
        return <FullScreenLoading />
    }

    return (
        <div className='container InstantSearchContainer py-4'>
            <InstantSearch indexName="books" searchClient={searchClient}>
                <div className='row'>
                    <div className="col-sm-3">
                        <ClearRefinements />

                        <h2>Genres</h2>
                        <RefinementList
                            showMore={true}
                            showMoreLimit={50}
                            attribute="genres"
                        />
                        <h2>Author</h2>
                        <RefinementList
                            showMore={true}
                            showMoreLimit={50}
                            attribute="authors"
                        />
                        <Configure
                            hitsPerPage={12}
                            attributesToSnippet={["description:20"]}
                            snippetEllipsisText={"..."}
                        />
                    </div>
                    <div className="col-sm-9">
                        <SearchBox style={{ color: 'black' }} />
                        <div className='row'>
                            <Hits
                                hitComponent={Hit}
                            />
                        </div>

                        <div className='mt-4'>
                            <Pagination showLast={true} />
                        </div>


                    </div>
                </div>
            </InstantSearch>
        </div>
    )
}