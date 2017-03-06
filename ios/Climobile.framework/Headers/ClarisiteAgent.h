//
//  ClarisiteAgent.h
//  Climobile
//
//  Copyright (c) 2015 Glassbox. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIViewController.h>

/*!
 * @framework Climobile
 * @brief Entry point to clarisite sdk.
 * @discussion ClarisiteAgent provide set of api which is accessible for user which
 * are working with this sdk.
 * No other api is visible in this framework.
 */
@interface ClarisiteAgent : NSObject

/*!
 * @function start
 * @brief Starts Clarisite Monitoring.
 * @param error
 *        if not nil, an error occurred, if the error domain is com.clarisite.mobile, then it's
 *        related to the framework it self.
 */
+ (void) start:(NSError**)error;


/**
 * @function start:serverUrl:appId:userData:error
 * @brief Starts the monitoring with user data.
 * The user data in this case can replace the configured data in the manifest.
 * @param serverUrl
 *           server url.
 * @param appId
 *           application id.
 * @param userData
 *           user custom data (see docs)
 */
+ (void) start:(NSString *) serverUrl appId:(NSString *)appId userData:(NSDictionary *) userData error:(NSError **) error;


/*!
 * @function stop
 * @brief Stops Clarisite Monitoring.
 */
+ (void) stop;


/*!
 * @function setScreenAsSensitive
 * @brief Exclude certain screen which is associated via controller from Clarisite Monitoring.
 * @param controller
 *              The controller to exclude from Clarisite Monitoring.
 */
+ (void) setScreenAsSensitive:(UIViewController *) controller;


/*!
 * @function setViewAsSensitive
 * @brief Set a view as sensitive which will hide the position of this view in every screenshot which
 * being send to the server.
 * @param view
 *             the view to mark as Sensitive
 */
+ (void) setViewAsSensitive:(UIView *)view;


/*!
 * @function setWebViewMonitoring
 * @brief Enable EyeView monitoring and web analytics for the web content which is executed under
 * a certain view.
 * @param view
 *           The view instance that should be monitored.
 */
+ (void) adaptView:(UIView *) view;


/**
 * @function reportEvent:event:parameters
 *
 * @brief Reports a user defined event.
 *
 * @discussion The user must at least provide an event name.
 *             in case event is nil the method will return and an event won't be reported.
 * @param event
 *          The event name.
 * @param parameters
 *          event parameters, The parameters dictionary can include any of the primitive wrapper classes
 *          or OBJc collections. complex custom object are not supported.
 */
+(void) reportEvent:(NSString *)event parameters:(NSDictionary *) parameters;


/**
 * @function enableNetworkMonitoring
 *
 * @brief Includes network monitoring as part of the recorded session.
 *
 * @discussion The Clarisite default monitoring capabilities does not include network traffic monitoring.
 * By enabling network monitoring the agent will start monitoring http/s request that the application performs.
 */
+(void) enableNetworkMonitoring;

@end

/*!
 * Possible error codes which can be returned (via the NSError) from the start method.
 */
typedef enum ClarisiteErrorCode {
    UNSUPPORTED_OS_VER = 0,
    CLARISITE_CONFIG_FILE_MISSING,
    CLARISITE_SERVER_URL_NOT_CONFIGURED,
    APPID_INVALID_FORMAT
} ClarisiteErrorCode;



extern NSString * const SERVER_URL_KEY;

extern NSString * const APP_ID;

extern NSString * const APPLICATION_CONFIGURATION_SERVER_URL;