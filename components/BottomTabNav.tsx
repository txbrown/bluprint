import React from 'react';
import { BottomNavigation, BottomNavigationTab } from 'react-native-ui-kitten';

export class BottomTabNav extends React.Component {
  public state = {
    selectedIndex: 0
  };

  private onTabSelect = (selectedIndex: number) => {
    this.setState({ selectedIndex });
  };

  public render(): React.ReactNode {
    return (
      <BottomNavigation
        selectedIndex={this.state.selectedIndex}
        onSelect={this.onTabSelect}
      >
        <BottomNavigationTab title="Places" />
        <BottomNavigationTab title="Tab 2" />
        <BottomNavigationTab title="Tab 3" />
      </BottomNavigation>
    );
  }
}
