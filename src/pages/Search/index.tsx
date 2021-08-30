import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import ProfileCard from 'components/ProfileCard';
import SearchFilters from 'components/SearchFilters';
import useQuery from 'utils/useQuery';
import { userSearch } from 'api';
import ProfileContainer from 'elements/Profile/ProfileContainer';
import { User } from 'components/ProfileImagesSection/types';

const Search: React.FC = () => {
    const query = useQuery();

    const search_param = query.get('search');
    const [searchResults, setSearchResults] = useState<User[]>([]);
    const [hometownFilters, setHometownFilters] = useState<string[]>([]);
    const [educationFilters, setEducationFilters] = useState<string[]>([]);
    const [workFilters, setWorkFilters] = useState<string[]>([]);

    const getFiltersFromData = (filter_name: string, data: Array<User>) => {
        return data
            .map((data_obj: any) => {
                if (filter_name in data_obj.profile)
                    return data_obj.profile[filter_name];
                return '';
            })
            .filter((value: any, index: any, original_array: any) => {
                return original_array.indexOf(value) === index && value !== '';
            });
    };

    const getSearchResults = () => {
        const requestData: Record<string, any> = {
            search: search_param,
        };

        query.forEach((value, key) => {
            requestData[key] = value;
        });
        userSearch(requestData).then((response: User[]) => {
            setSearchResults(response);
            setWorkFilters(getFiltersFromData('work', response));
            setEducationFilters(getFiltersFromData('education', response));
            setHometownFilters(getFiltersFromData('hometown', response));
        });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(getSearchResults, [query.toString(), search_param]);

    return (
        <div>
            <ProfileContainer>
                <Row>
                    <Col md='4'>
                        <SearchFilters
                            hometownFilters={hometownFilters && hometownFilters}
                            educationFilters={
                                educationFilters && educationFilters
                            }
                            workFilters={workFilters && workFilters}
                        />
                    </Col>
                    <Col md='8'>
                        <h4>
                            {`${searchResults.length} Search Result(s) for ${search_param}`}
                        </h4>
                        <div>
                            {searchResults.map((user) => (
                                <ProfileCard
                                    id={user.id as string}
                                    picture={user.profile.profile_picture}
                                    name={`${user.first_name}  ${user.last_name}`}
                                    hometown={user.profile.hometown}
                                    age={user.profile__age}
                                    gender={user.profile.gender}
                                    extras={
                                        // eslint-disable-next-line no-nested-ternary
                                        user.profile.education
                                            ? user.profile.education
                                            : user.profile.work
                                            ? user.profile.work
                                            : user.profile.relationship_status
                                    }
                                    key={`${user.first_name}-id-${user.id}`}
                                />
                            ))}
                        </div>
                    </Col>
                </Row>
            </ProfileContainer>
        </div>
    );
};

export default Search;
