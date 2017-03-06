//
//  ClarisiteAgent.m
//  LionsOfficial
//
//  Created by 周贤 on 2017/3/6.
//  Copyright © 2017年 Facebook. All rights reserved.
//



#import "ClarisiteAgent.h"

@implementation ClarisiteAgent
RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD( start:(NSError**)error)
{
  RCTLogInfo(@"start:(NSError**)error ");
}

RCT_EXPORT_METHOD( start:(NSString *) serverUrl appId:(NSString *)appId userData: (NSDictionary*) userData error:(NSError **) error)
{
  RCTLogInfo(@"start:(NSString *) serverUrl ");
}
RCT_EXPORT_METHOD( stop)
{
  RCTLogInfo(@"stop ");
}

@end
