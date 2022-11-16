import { useState } from 'react';

import { LeftSidebar } from '~/components/compounds/Left-Sidebar/components';
import { SpinnerLoading } from '~/components/compounds/Spinner';
import { Layout } from '~/components/molecules/layout';

export const Management = () => {
  const options = [
    {
      name: 'testowe 1',
      placeholder: 'Testowy kanał 1',
      href: '1',
      component: 'here-component 1',
    },
    {
      name: 'testowe 2',
      placeholder: 'Testowy kanał 2',
      href: '2',
      component: 'here-component 2',
    },
    {
      name: 'testowe 3',
      placeholder: 'Testowy kanał 3',
      href: '3',
      component: 'here-component 3',
    },
  ];

  const [selectedOption, setSelectedOption] = useState(options[0].name);

  const getSelectedComponent = () => {
    if (selectedOption) {
      const findedOption = options.find(
        (option) => option.name === `${selectedOption}`
      )?.component;
      if (findedOption) {
        return findedOption;
      }
    }
    return <SpinnerLoading />;
  };

  return (
    <Layout display="flex" direction="row" minWidth="100%" paddingTop={15}>
      <LeftSidebar
        options={options}
        onClick={(option: string) => setSelectedOption(option)}
        selected={selectedOption}
      />
      <Layout
        background="rgb(255, 255, 255)"
        borderTopLeftRadius="8px"
        borderTopRightRadius="8px"
        width="100%"
        height="100%"
        padding={[40]}
      >
        {getSelectedComponent()}
      </Layout>
    </Layout>
  );
};
