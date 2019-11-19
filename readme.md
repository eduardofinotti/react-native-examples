# RUN PROJECT

## Clone project
 - $git clone https://github.com/eduardofinotti/react-native-examples.git

## Install dependencies
- $npm install

## Run Android
- $react-native run-android

## Run Android
- $react-native run-ios

-------

# HELPERS COMMANDS 


## List emulators android
list android: emulator -list-avds

## CLEAN CACHES
If you are sure the module exists, try these steps:
 1. Clear watchman watches: watchman watch-del-all
 2. Delete node_modules: rm -rf node_modules and run yarn install
 3. Reset Metro's cache: yarn start --reset-cache
 4. Remove the cache: rm -rf /tmp/metro-*


 <Image source={map} style={ {height: '100%' }} />

## BOTTOM DIALOG
 <!-- <RBSheet
    ref={ref => {
    this.Scrollable2 = ref;
    }}
    closeOnDragDown
    height = { 800 }
    customStyles={{
    container: {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    }}}>
    <ScrollView>
    <View style={styles.gridContainer}>
        {/* {data.grids.map(grid => ( */}
        <TouchableOpacity
            // key={grid.icon}
            onPress={() => this.Scrollable2.close()}
            style={styles.gridButtonContainer}>
            <View style={[styles.gridButton, { backgroundColor: '#FFF' }]}>
            {/* s<FAIcon name={grid.icon} style={styles.gridIcon} /> */}
            </View>
            <Text style={styles.gridLabel}>TCHAU!</Text>
        </TouchableOpacity>
        {/* ))} */}
    </View>
    </ScrollView>
</RBSheet> -->

