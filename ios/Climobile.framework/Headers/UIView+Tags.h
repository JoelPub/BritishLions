//
//  UIView+Tags.h
//  Climobile
//
//  Copyright (c) 2015 Glassbox. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIView.h>

@interface UIView (Tags)

/**
 * @function setClarisiteTag:
 * @brief Set a user defined custom tag for a given view.
 * The user tag will be used in the clarisite server side reports.
 *
 * @param tag
 *         user custom tag.
 */
-(void) setClarisiteTag:(NSString *) tag;

@end
