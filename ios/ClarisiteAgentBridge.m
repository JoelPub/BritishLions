//
//  ClarisiteAgent.m
//  LionsOfficial
//
//  Created by 周贤 on 2017/3/6.
//  Copyright © 2017年 Facebook. All rights reserved.
//



#import "ClarisiteAgentBridge.h"
#import <Climobile/ClarisiteAgent.h>

@implementation ClarisiteAgentBridge
RCT_EXPORT_MODULE();


RCT_EXPORT_METHOD( start )
{
  RCTLogInfo(@"start:(NSString *) serverUrl ");
  @try
  {
    NSError * error = nil;
    [ClarisiteAgent start:&error];
  }@catch (NSException * e) {
   
    return;
  }
}
RCT_EXPORT_METHOD( stop)
{
  RCTLogInfo(@"stop ");
  [ClarisiteAgent stop];
  
}

@end
